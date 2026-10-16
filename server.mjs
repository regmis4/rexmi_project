import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import contact from './api/contact.mjs';
const files = new Map([
  ['/', ['rexmi.html', 'text/html; charset=utf-8']],
  ['/contact.html', ['contact.html', 'text/html; charset=utf-8']],
  ['/rexmi_technical_foundation.pdf', ['rexmi_technical_foundation.pdf', 'application/pdf']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['/robots.txt', ['robots.txt', 'text/plain; charset=utf-8']],
  ['/sitemap.xml', ['sitemap.xml', 'application/xml; charset=utf-8']],
  ...['rexmi-concept', 'nasa-moon-base', 'parallel-training', 'crater-simulation', 'terrain-simulation', 'navigation-simulation'].map(name => [`/assets/site/${name}.webp`, [`assets/site/${name}.webp`, 'image/webp']]),
  ['/assets/site/farfield-social.png', ['assets/site/farfield-social.png', 'image/png']]
]);
createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
  let url;
  try { url = new URL(req.url, 'http://localhost'); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  const path = url.pathname;
  if (path === '/api/contact') return contact(req, res);
  if (['GET', 'HEAD'].includes(req.method) && ['/rexmi.html', '/index.html'].includes(path)) {
    res.writeHead(308, { Location: '/' + url.search });
    return res.end();
  }
  if (!['GET', 'HEAD'].includes(req.method) || !files.has(path)) { res.writeHead(404); return res.end('Not found'); }
  const [file, type] = files.get(path);
  try {
    const data = await readFile(new URL(file, import.meta.url));
    const etag = '"' + createHash('sha256').update(data).digest('hex') + '"';
    res.setHeader('ETag', etag);
    res.setHeader('Cache-Control', type.startsWith('image/') ? 'public, max-age=3600' : 'no-cache');
    if (req.headers['if-none-match'] === etag) { res.writeHead(304); return res.end(); }
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length });
    res.end(req.method === 'HEAD' ? undefined : data);
  }
  catch { res.writeHead(500); res.end('Unavailable'); }
}).listen(Number(process.env.PORT || 8080), process.env.HOST || '127.0.0.1');
