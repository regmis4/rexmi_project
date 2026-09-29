// Keep delivery credentials and the recipient in server environment variables.
const buckets = new Map();
let globalWindow = { until: 0, count: 0 };
function limited(key) {
  const now = Date.now();
  for (const [ip, entry] of buckets) if (entry.until <= now) buckets.delete(ip);
  if (globalWindow.until <= now) globalWindow = { until: now + 60000, count: 0 };
  if (++globalWindow.count > 30 || buckets.size > 10000) return true;
  const entry = buckets.get(key) || { until: now + 600000, count: 0 };
  buckets.set(key, entry);
  return ++entry.count > 5;
}
export function createContactHandler({ env = process.env, send = fetch } = {}) {
  return async function contact(req, res) {
    const reply = (code, data) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)); };
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return reply(405, { ok: false }); }
    if (!env.SITE_ORIGIN || req.headers.origin !== env.SITE_ORIGIN) return reply(403, { ok: false });
    if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { ok: false });
    let data;
    try {
      let body = '', size = 0;
      for await (const chunk of req) { size += Buffer.byteLength(chunk); if (size > 16384) return reply(413, { ok: false }); body += chunk; }
      data = JSON.parse(body);
    } catch { return reply(400, { ok: false }); }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { ok: false });
    if (data.website) return reply(400, { ok: false });
    const { name, email, phone = '', note } = data;
    const text = (v, min, max) => typeof v === 'string' && v.trim().length >= min && v.length <= max;
    if (!text(name, 1, 100) || /[\r\n]/.test(name) || !text(email, 3, 254) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !text(phone, 0, 40) || /[\r\n]/.test(phone) || !text(note, 1, 3000)) return reply(400, { ok: false });
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO) return reply(503, { ok: false });
    const ip = env.TRUST_PROXY === '1' ? String(req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(',')[0].trim() : req.socket.remoteAddress;
    if (limited(ip)) return reply(429, { ok: false });
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email.trim(), subject: 'FARFIELD — Website inquiry', text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim() || 'Not provided'}\n\n${note.trim()}` }),
        signal: AbortSignal.timeout(10000)
      });
      const result = await response.json();
      if (!response.ok || !result.id) return reply(502, { ok: false });
      return reply(200, { ok: true });
    } catch { return reply(502, { ok: false }); }
  };
}
export default createContactHandler();
