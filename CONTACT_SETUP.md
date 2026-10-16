# FARFIELD Robotics contact delivery

Live contact delivery is active on `https://farfieldrobotics.com`. On 16 October 2026, an authorized inquiry submitted through the public form returned success and Resend confirmed delivery to the configured founder inbox.

Run on Node.js 22+ with `node --env-file=.env server.mjs`. No package installation is needed. Copy `.env.example` to `.env` and configure the values privately on your hosting provider:

- `SITE_ORIGIN`: the exact public HTTPS origin, without a trailing slash.
- `RESEND_API_KEY`: a Resend sending key.
- `CONTACT_FROM`: a sender on your Resend-verified domain.
- `CONTACT_TO`: the founder inbox specified for this project. Keep it out of public files.
- `HOST` and `PORT`: hosting-specific listener settings.

The server serves an explicit allowlist: the homepage, contact page, PDF, optimized public images, favicon, robots.txt and sitemap. Secrets, internal reviews and project sources are never served. GitHub Pages alone cannot execute this backend. The API module can also be adapted to the selected host's serverless request interface.

Before launch, configure HTTPS and the email domain, then submit one authorized real inquiry and confirm receipt. A browser-only preview does not prove email delivery. Missing configuration returns an error; the form never reports success without provider acceptance.

Name, email and note are required; phone is optional. The API validates sizes and fields, checks the allowed origin, uses a honeypot, and limits requests in memory. Deploy behind a host-level rate limiter for persistent or multi-instance abuse protection. Enable TRUST_PROXY only when the proxy overwrites forwarding headers. Contact details are used for replies, not mailing-list enrollment. The server does not log inquiry bodies. Resend processes outgoing messages.

Tests: `npm test` on Node.js 22+ (mock provider; sends no real email).

## Production domain

The chosen canonical origin is `https://farfieldrobotics.com`. Configure the hosting provider to redirect `www` to the root domain. The server redirects legacy `/rexmi.html` and `/index.html` links to `/`.

Render setup: connect `regmis4/rexmi_project`, select a Node Web Service, use build command `node --check server.mjs`, start command `npm start`, and set `HOST=0.0.0.0`. Set `SITE_ORIGIN` to the canonical origin. Let the host supply `PORT`. Configure the sender, recipient and Resend API key privately; do not commit `.env`.

Add the domain in the host dashboard, copy its DNS records to Cloudflare and verify HTTPS. Verify a sending domain in Resend using its DNS records. After one authorized inquiry reaches the inbox, submit `/sitemap.xml` in Google Search Console.

The HTML now loads images from `assets/site/`; deploy that directory with the pages. Opening or sharing the HTML alone no longer includes the images. Run the Node server to preview the complete site.

Release verification on 16 October 2026: public HTTPS, root and www redirects, pages, images and brief passed checks. Resend domain verification is complete. A sending-only key restricted to `farfieldrobotics.com` is stored in Render environment variables; no credential is committed to this repository. One live form submission was delivered successfully. Render currently uses the free instance, which can introduce a cold-start delay after inactivity.
