import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { createContactHandler } from '../api/contact.mjs';
const env = { SITE_ORIGIN:'https://example.test', RESEND_API_KEY:'test-only', CONTACT_FROM:'sender@example.test', CONTACT_TO:'owner@example.test' };
const valid = {name:'Test Person',email:'visitor@example.test',phone:'+1 555 0100',note:'Test inquiry'};
let address=0;
async function run({data=valid,config=env,origin=env.SITE_ORIGIN,send=async()=>({ok:true,json:async()=>({id:'mock'})}),ip}={}) {
 const req=Readable.from([JSON.stringify(data)]);req.method='POST';req.headers={origin,'content-type':'application/json'};req.socket={remoteAddress:ip||String(++address)};
 let result;const res={setHeader(){},writeHead(code){this.code=code},end(body){result={code:this.code,data:JSON.parse(body)}}};await createContactHandler({env:config,send})(req,res);return result;
}
test('routes all fields to private recipient with visitor reply-to',async()=>{let message;const r=await run({send:async(url,args)=>{message=JSON.parse(args.body);return {ok:true,json:async()=>({id:'mock'})}}});assert.equal(r.code,200);assert.deepEqual(message.to,[env.CONTACT_TO]);assert.equal(message.reply_to,valid.email);for(const value of Object.values(valid))assert.ok(message.text.includes(value));});
test('rejects bad email and empty note',async()=>{assert.equal((await run({data:{...valid,email:'invalid'}})).code,400);assert.equal((await run({data:{...valid,note:' '}})).code,400);});
test('rejects forged origins and honeypot',async()=>{assert.equal((await run({origin:'https://other.test'})).code,403);assert.equal((await run({data:{...valid,website:'spam'}})).code,400);});
test('missing configuration cannot claim success',async()=>assert.equal((await run({config:{SITE_ORIGIN:env.SITE_ORIGIN}})).code,503));
test('provider rejection cannot claim success',async()=>assert.equal((await run({send:async()=>({ok:false,json:async()=>({error:'no'})})})).code,502));
test('phone optional',async()=>assert.equal((await run({data:{...valid,phone:''}})).code,200));
test('oversized body rejected',async()=>assert.equal((await run({data:{...valid,note:'x'.repeat(17000)}})).code,413));
test('repeated submissions limited',async()=>{for(let i=0;i<5;i++)assert.equal((await run({ip:'limited-client'})).code,200);assert.equal((await run({ip:'limited-client'})).code,429);});
