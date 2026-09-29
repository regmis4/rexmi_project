# FARFIELD contact delivery

The contact page and email endpoint are implemented. Live delivery is not activated.

Run on Node.js 22+ with `node --env-file=.env server.mjs`. No package installation is needed. Copy `.env.example` to `.env` and configure the values privately on your hosting provider:

- `SITE_ORIGIN`: the exact public HTTPS origin, without a trailing slash.
- `RESEND_API_KEY`: a Resend sending key.
- `CONTACT_FROM`: a sender on your Resend-verified domain.
- `CONTACT_TO`: the founder inbox specified for this project. Keep it out of public files.
- `HOST` and `PORT`: hosting-specific listener settings.

The server serves only the homepage, contact page and PDF; secrets and project files are never served. GitHub Pages alone cannot execute this backend. The API module can also be adapted to the selected host's serverless request interface.

Before launch, configure HTTPS and the email domain, then submit one authorized real inquiry and confirm receipt. A browser-only preview does not prove email delivery. Missing configuration returns an error; the form never reports success without provider acceptance.

Name, email and note are required; phone is optional. The API validates sizes and fields, checks the allowed origin, uses a honeypot, and limits requests in memory. Deploy behind a host-level rate limiter for persistent or multi-instance abuse protection. Enable TRUST_PROXY only when the proxy overwrites forwarding headers. Contact details are used for replies, not mailing-list enrollment. The server does not log inquiry bodies. Resend processes outgoing messages.

Tests: `node --test tests/contact.test.mjs` (mock provider; sends no real email).
