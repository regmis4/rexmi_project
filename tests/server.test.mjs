import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
let child, base;
before(async()=>{
 const probe=createServer().listen(0,'127.0.0.1');await once(probe,'listening');const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
 base=`http://127.0.0.1:${port}`;
 child=spawn(process.execPath,['server.mjs'],{cwd:new URL('..',import.meta.url),env:{...process.env,HOST:'127.0.0.1',PORT:String(port),SITE_ORIGIN:base,RESEND_API_KEY:''},stdio:'ignore'});
 for(let i=0;i<60;i++){try{const r=await fetch(base);if(r.ok)return;}catch{}await new Promise(resolve=>setTimeout(resolve,50));}throw new Error('Preview server failed to start');
});
after(async()=>{if(child&&child.exitCode===null){child.kill();await once(child,'exit');}});
test('legacy home links redirect to the canonical root',async()=>{for(const path of ['/rexmi.html?preview=1','/index.html?preview=1']){const r=await fetch(base+path,{redirect:'manual'});assert.equal(r.status,308);assert.equal(r.headers.get('location'),'/?preview=1');}});
test('private files and traversal are never served',async()=>{for(const path of ['/.env','/CONTACT_SETUP.md','/sources/youtube_investor_one_pager.md','/assets/credits-and-prompt.md','/assets/site/%2e%2e/%2e%2e/.env','/server.mjs'])assert.equal((await fetch(base+path)).status,404,path);});
test('all public assets and search files are served with correct types',async()=>{for(const [path,type] of [['/contact.html','text/html'],['/robots.txt','text/plain'],['/sitemap.xml','application/xml'],['/favicon.svg','image/svg+xml'],['/assets/site/farfield-social.png','image/png'],['/assets/site/navigation-simulation.webp','image/webp'],['/rexmi_technical_foundation.pdf','application/pdf']]){const r=await fetch(base+path);assert.equal(r.status,200,path);assert.ok(r.headers.get('content-type').startsWith(type));assert.ok((await r.arrayBuffer()).byteLength>0);}});
test('HEAD and conditional requests preserve caching semantics',async()=>{const get=await fetch(base+'/assets/site/rexmi-concept.webp');const size=(await get.arrayBuffer()).byteLength;const head=await fetch(base+'/assets/site/rexmi-concept.webp',{method:'HEAD'});assert.equal(Number(head.headers.get('content-length')),size);assert.equal((await head.arrayBuffer()).byteLength,0);const cached=await fetch(base+'/assets/site/rexmi-concept.webp',{headers:{'If-None-Match':get.headers.get('etag')}});assert.equal(cached.status,304);});
test('unconfigured email delivery returns an error without exposing configuration',async()=>{const r=await fetch(base+'/api/contact',{method:'POST',headers:{Origin:base,'Content-Type':'application/json'},body:JSON.stringify({name:'Launch test',email:'test@example.test',note:'Local test only'})});assert.equal(r.status,503);assert.deepEqual(await r.json(),{ok:false});});
