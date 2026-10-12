# Security review

Reviewed on 12 October 2026 against the portfolio site on this branch. No critical issues remain in the working tree. The contact form is the only email channel. Social profile links and the scheduling link are unchanged because they are not an email address or a phone number, and removing them would change the layout.

No phone numbers were found in the source, metadata, or JSON-LD.

## Findings

### High

1. **A personal mailbox was public.** It lived in `content/site.ts` and was rendered in the contact card, copied into JSON-LD as a `mailto:` link, and pulled into the client bundle because client components import that module. It is removed from the source, the page, metadata, and JSON-LD. A production build was checked so the address is not in the HTML or the client chunks. Git history still has it; see the leftover list below.

2. **Next.js 16.1.4 was behind several security fixes.** That range includes the App Router CSP-nonce XSS fixed in 16.2.5 (GHSA-ffhc-5mcf-pf4q / CVE-2026-44581), plus denial-of-service and proxy-bypass advisories shipped in the same patch. `next` and `eslint-config-next` are now 16.4.0. The nonce in `proxy.ts` is generated on the server. Inbound `Content-Security-Policy` and `x-nonce` request headers are discarded before the policy is set, so a caller cannot supply the nonce.

3. **The contact API had no rate limit.** A script could burn the email provider quota or fill the inbox. `POST /api/contact` now allows 5 requests per 10 minutes per IP (override with `CONTACT_RATE_LIMIT_MAX` and `CONTACT_RATE_LIMIT_WINDOW_SECONDS`). When `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set, the counter is stored in Upstash Redis. The same code accepts the Vercel KV / Upstash pair `KV_REST_API_URL` and `KV_REST_API_TOKEN`. If neither pair is set, or the store errors, a bounded in-memory window is used. That fallback does not span serverless instances, so production should use Upstash.

### Medium

4. **Validation errors were returned to the browser.** Zod issue paths and messages told a caller exactly which fields failed. The API now returns a generic `Invalid request`, `Too many requests. Please try again later.`, or `Failed to send message`. Stack traces, provider errors, and the recipient address are not included. Server logs use static codes only.

5. **Header and mailbox injection was not rejected.** Names, the subject, and the reply-to address are placed in mail headers. Newlines, other control characters, and bidirectional overrides are now rejected. The message body may contain newlines, but not other control characters.

6. **The outgoing message was not HTML-escaped.** The route used to send a plain-text body. It now sends a text part and an HTML part. Every interpolated value in the HTML part is escaped, including `<`, `>`, `&`, quotes, and newlines (newlines become `<br>` after escaping). The visitor's address is used only as `replyTo`, never as `from`.

7. **The recipient and sender were not fully server-side.** The inbox already came from `CONTACT_EMAIL`, but the public mailbox constant was bundled to the client, and the From address was hardcoded to Resend's shared onboarding sender. That sender only delivers to the Resend account owner. `CONTACT_EMAIL` and `CONTACT_FROM` are read on the server, checked for a single safe address (or `Name <address>` for the sender), and are never sent to the client. If they or `RESEND_API_KEY` are missing in production, the API returns the generic failure. In development it accepts the submission without calling Resend, so the form can be tested with no key.

8. **Security headers were missing, and `X-Powered-By` was left on.** `next.config.ts` now sends:
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains` (no `preload`)
   - `X-Frame-Options: DENY` and CSP `frame-ancestors 'none'`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy` denying camera, microphone, geolocation, payment, USB, and related sensors
   - `Cross-Origin-Opener-Policy: same-origin`
   - `Cross-Origin-Resource-Policy: same-origin`
   - `X-DNS-Prefetch-Control: off`
   - `X-Permitted-Cross-Domain-Policies: none`

   `poweredByHeader` is false. Browser source maps are off (`productionBrowserSourceMaps: false`). Server and Turbopack source maps are off as well (`enablePrerenderSourceMaps`, `experimental.serverSourceMaps`, `experimental.turbopackSourceMaps`), so the production build does not emit `.map` files.

   The page Content-Security-Policy is set in `proxy.ts`, not duplicated in `next.config.ts`, because a nonce has to be unique per request and browsers enforce every CSP header. Scripts use `'nonce-...'` and `'strict-dynamic'`. Styles use `'unsafe-inline'` on purpose: HeroUI and framer-motion set style attributes, and a style nonce would make browsers ignore `'unsafe-inline'` and break that styling. `'unsafe-eval'` and websocket `connect-src` are added only in development. `upgrade-insecure-requests` is production-only so local HTTP still works. Nonces require dynamic rendering, so the root layout waits for the request with `connection()`. API responses use a separate `default-src 'none'` policy.

9. **Environment files were only partly ignored.** `.gitignore` covered `.env.local` and the `*.local` variants, not `.env`, `.env.production`, or `.env.development`. No secret file is tracked, and a history search found no API keys, private keys, or cloud access-key IDs. `.gitignore` now ignores `.env` and `.env.*`, with an exception for `.env.example`.

10. **Dependency advisories in the lockfile.** `pnpm audit` after the Next.js upgrade reported high issues in `postcss` (and its `nanoid`), `browserslist`, `baseline-browser-mapping`, `source-map-js`, and a moderate issue in `uuid` via Resend's `svix` dependency. Direct upgrades cleared them: `postcss` 8.5.29, `autoprefixer` 10.6.1, `tailwindcss` / `@tailwindcss/postcss` 4.3.3, and `resend` 6.32.1. Tailwind stayed on v4. The contact section was compared before and after; the layout, type, and colors match, with the mailbox line removed.

### Low

11. **JSON-LD used `dangerouslySetInnerHTML`.** It is still the one `dangerouslySetInnerHTML` on the site, which is the normal way to emit JSON-LD. The serialized JSON now escapes `<` as `\u003c`, so a value cannot close the script tag. Project links were already limited to `http:` and `https:` URLs; that check now goes through `URL` parsing. Anchor tags that open a new tab already had `rel="noopener noreferrer"`. The scheduling button used `window.open` without `noopener`; it now passes `noopener,noreferrer`.

12. **`/api/contact` was crawlable.** `public/robots.txt` disallows `/api/`. API responses also send `X-Robots-Tag: noindex, nofollow` and `Cache-Control: no-store`. `GET` returns 405. There are no other API routes.

13. **The honeypot was the only bot control.** The hidden `website` field is still there, with a label inside the hidden container so simple bots are more likely to fill it. A filled honeypot gets the same success response as a real send and does not send mail. Optional Cloudflare Turnstile is wired behind `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. With either value unset on the server secret, verification stays off and the widget is not rendered, so the form looks the same. When the secret is set, a missing or bad token is rejected with the generic invalid-request response. The token's hostname must match the request host.

14. **`braces` has no fix.** `pnpm audit` still reports one high advisory: `braces` 3.0.3 via `eslint-config-next` → `@next/eslint-plugin-next` → `fast-glob` → `micromatch`. The advisory's patched range is empty (`<0.0.0`). It is a development-tool dependency (stack exhaustion on a deeply nested pattern), not code shipped to site visitors. It was left in place rather than forcing a broken override.

15. **A missing favicon and an image-size warning were left as they were.** `/favicon.ico` returns 404 because `public/` has no favicon. The dev console also warns that the avatar's CSS changes one dimension. Neither is a security defect, and both predate this pass. They were left so the layout stays the same.

## What still needs action

These are not things the site can finish in the repository.

1. **Vercel environment variables**, then a redeploy when you are ready (this branch was not deployed):
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL` — the inbox that receives the form. Server-only. Do not use a `NEXT_PUBLIC_` name.
   - `CONTACT_FROM` — a verified sender, for example `Portfolio <sender@your-domain>`
   - Recommended: `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` (Upstash Redis from the Vercel marketplace). Without them, rate limiting is per instance only.
   - Optional: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (public, inlined at **build** time, so set it before the build) and `TURNSTILE_SECRET_KEY`

2. **Domain and DNS**, once the domain is chosen. `tonyblanco.dev` is already the candidate in site metadata, `robots.txt`, and the sitemap. At the DNS host, add the records the email provider shows for that domain:
   - **SPF** — one TXT record on the root that authorizes only that provider's include. Do not create a second SPF record.
   - **DKIM** — the CNAMEs or TXT records the provider gives you. This is what mailbox providers use to verify the signature.
   - **DMARC** — a TXT record on `_dmarc` once SPF and DKIM pass. Start with `p=none` and a report mailbox you control, then move to `p=quarantine` after reports look clean. DMARC alignment is why the From domain should be the domain you verified, not a shared onboarding domain.
   - **HSTS** — the header includes subdomains. Only keep that if every hostname under the domain will serve HTTPS. The header does not include `preload`; do not submit the domain to the HSTS preload list until that is true.

3. **Git history.** Removing the mailbox from the current tree does not erase it from older commits, including commit author metadata on the original commits. No API keys were found in history. History was not rewritten. If this repository is or becomes public, treat that older mailbox as already exposed. Rewriting history would take a coordinated force-push and is a separate decision.

4. **`braces`**, when ESLint's dependency chain publishes a fix. Re-run `pnpm audit`.

5. **Confirm the form against the real provider** after the env vars and DNS exist. Local and preview runs without a key only exercise the mock path.

## Email provider

This is a low-volume personal contact form: well under a hundred messages a month, sent from a Next.js route on Vercel, from Argentina, with the domain not chosen yet. Prices below were checked on 12 October 2026.

| Provider | Free tier | Paid entry | Deliverability | Setup with Vercel / Next.js | Domain verification | Fit for this form |
| --- | --- | --- | --- | --- | --- | --- |
| Resend | Free forever. 3,000 emails/month, 100/day, 3 domains, 30-day logs. Official pricing page. | Pro is $20/month for 50,000, then $0.90 per extra 1,000. | Strong for transactional mail on a verified domain. The shared onboarding sender must not be used for real visitors. | Official Node SDK. Already integrated. Three env vars. | SPF and DKIM DNS records. Add your own DMARC. | Best fit. |
| Postmark | 100 emails/month, forever, no overage. Official pricing page. | Basic is $15/month for 10,000, then $1.80 per extra 1,000. | The strongest reputation of this list. Built only for transactional mail. | Official Node SDK or SMTP. Small route change. | DKIM, SPF, and DMARC are first-class. | Excellent mail, unnecessary cost and a tiny free tier. |
| Amazon SES | No permanent free email allowance. New AWS accounts can get up to $200 in credits; the free-plan window is six months and credits expire after 12 months. Official pricing page. | New accounts and regions default to the Essentials plan from 21 July 2026 at $0.16 per 1,000 for the first 10 million. À-la-carte is about $0.10 per 1,000 if you switch. | Excellent once the account is out of the sandbox and the domain is authenticated. You own bounce and complaint handling. | AWS SDK, IAM access keys in Vercel, and a region. São Paulo (`sa-east-1`) is the closest region. | Easy DKIM in the console, plus SPF and DMARC in DNS. Production access is a separate request. | Best raw price, most setup. Runner-up if you want it on an AWS account you already operate. |
| SendGrid | No permanent free plan. Twilio's own support article: new accounts since 25 March 2025 get a 60-day trial, 100 emails/day, and sending stops when the trial ends. | Essentials starts around $19.95/month. | Fine for transactional mail, with more marketing-account risk and review friction. | Official Node SDK. Heavier dashboard. | Domain authentication via CNAME. | Poor fit. The trial ends. |
| Mailgun | 2026 comparisons disagree on whether a 100-email/day free plan is still permanent. Do not plan on a lasting free tier unless the Mailgun dashboard shows one at signup. | Entry paid plans are about $15 to $35/month depending on the current Foundation / Basic tier. | Solid transactional reputation. EU regions exist if data residency matters. | Official Node SDK. | SPF, DKIM, and tracking CNAMEs. | More product than this form needs, and the free tier is uncertain. |
| Brevo | Free forever, 300 emails/day, no card. Official help center. Unused daily quota does not roll over. | Starter removes the daily cap and bills a monthly volume. | Acceptable. The service is a marketing suite, so transactional reputation depends on not mixing campaigns onto the same sender. | SMTP or REST. A larger account to configure. | Domain authentication DNS, then a separate transactional sender. | Generous free quota, but the product is aimed at newsletters. |

### Recommendation

**Stay with Resend.**

The route already uses it, the free tier covers a personal contact form many times over, and the Vercel setup is three environment variables plus DNS. Postmark is the one to switch to later if messages actually land in spam; its free tier is only 100 messages a month, then $15. SES is the runner-up because you already work in AWS and the per-message price is lower, but a new account is in the sandbox (verified recipients only until production access is approved), the July 2026 Essentials plan is the default, and you would store IAM credentials on Vercel for a volume that Resend does not charge for. SendGrid's free plan is gone. Mailgun's free allowance is not clear enough to plan on. Brevo's 300-a-day free plan is real, and it is still a marketing product wrapped around a contact form.

Practical order once the domain is chosen, whether that is `tonyblanco.dev` or another name:

1. Create the Resend account and verify the domain. Wait until DKIM and SPF show as verified.
2. Add a DMARC record at `p=none`.
3. Set `RESEND_API_KEY`, `CONTACT_EMAIL`, and `CONTACT_FROM` on Vercel. `CONTACT_FROM` must use the verified domain.
4. Add Upstash Redis and set the two REST variables so the rate limit is shared across instances.
5. Send one message through the live form and confirm it arrives, with a working reply-to, before sharing the site.

Nothing in this review was deployed, merged, or pushed to the default branch.
