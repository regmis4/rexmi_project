import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import contact from './api/contact.mjs';
const files = new Map([
  ['/', ['rexmi.html', 'text/html; charset=utf-8']],
  ['/rexmi.html', ['rexmi.html', 'text/html; charset=utf-8']],
  ['/contact.html', ['contact.html', 'text/html; charset=utf-8']],
  ['/rexmi_technical_foundation.pdf', ['rexmi_technical_foundation.pdf', 'application/pdf']]
]);
createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/api/contact') return contact(req, res);
  if (!['GET', 'HEAD'].includes(req.method) || !files.has(path)) { res.writeHead(404); return res.end('Not found'); }
  const [file, type] = files.get(path);
  try { const data = await readFile(new URL(file, import.meta.url)); res.writeHead(200, { 'Content-Type': type, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin' }); res.end(req.method === 'HEAD' ? undefined : data); }
  catch { res.writeHead(500); res.end('Unavailable'); }
}).listen(Number(process.env.PORT || 8080), process.env.HOST || '127.0.0.1');
