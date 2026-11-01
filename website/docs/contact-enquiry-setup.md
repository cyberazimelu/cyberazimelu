# PMAT Contact Enquiry Setup

The PMAT website enquiry form sends plain-text email through the Hostinger Mail REST API. Enquiries are delivered to `info@pmazimelutechnologies.com`. The application does not save enquiry submissions to a database or write their contents to application logs.

The API token and Turnstile secret are server-side credentials. Never expose them in client-side code, source control, public logs, or support messages.

## 1. Hostinger Mail API

The application uses the Hostinger Mail API:

- Base URL: `https://api.mail.hostinger.com/api/v1`
- Endpoint: `POST /mailboxes/{mailboxResourceId}/send`
- Authentication: Bearer API token
- Content type: JSON
- Successful response: HTTP `204 No Content`

The mailbox resource ID and API token must belong to the Hostinger account authorised to send mail for the PMAT mailbox.

The application sends enquiries to the fixed recipient:

`info@pmazimelutechnologies.com`

The visitor's validated email address is included in the enquiry message so PMAT can reply manually. It is not used as an arbitrary recipient address.

## 2. Required environment variables

Create `.env.local` for local development using `.env.example` as the template.

| Variable | Purpose |
| --- | --- |
| `HOSTINGER_MAILBOX_RESOURCE_ID` | Hostinger mailbox resource ID |
| `HOSTINGER_EMAIL_API_TOKEN` | Private Hostinger Mail API token |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Private Cloudflare Turnstile secret |
| `TURNSTILE_ALLOWED_HOSTNAMES` | Comma-separated exact hostnames accepted by Siteverify |

Never commit `.env.local` or real credentials. Keep the Hostinger API token and Turnstile secret out of all `NEXT_PUBLIC_` variables.

## 3. Cloudflare Turnstile

1. Open Turnstile in the Cloudflare dashboard.
2. Create or select the widget for the PMAT website.
3. Add the exact hostnames used by the website, such as `pmazimelutechnologies.com` and `www.pmazimelutechnologies.com` if both are served.
4. Copy the matching site key and secret key.
5. Configure the application hostname allowlist to match the hostnames configured in the widget.

The application verifies the Turnstile token using Cloudflare Siteverify. It checks successful verification, the returned hostname, and the expected action `enquiry`.

Use test keys only in local testing. Production must use the matching real site key and secret key. Cloudflare test responses may use a different action, so they may not pass this application's production action check.

## 4. Local development

1. Copy `.env.example` to `.env.local`.
2. Replace every placeholder with the appropriate local/test credential.
3. Confirm `.env.local` is ignored by Git.
4. Restart the local Next.js development server after changing environment variables.
5. Submit a test enquiry and confirm that it reaches the PMAT mailbox.

Do not use production secrets in public code or commit them to the repository.

## 5. Hostinger production environment

Configure these variables in the Hostinger Node.js application's environment settings:

- `HOSTINGER_MAILBOX_RESOURCE_ID`
- `HOSTINGER_EMAIL_API_TOKEN`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `TURNSTILE_ALLOWED_HOSTNAMES`

For production, use the exact served hostnames, for example:

`pmazimelutechnologies.com,www.pmazimelutechnologies.com`

Do not include `localhost` unless the production application genuinely needs to accept it.

`NEXT_PUBLIC_TURNSTILE_SITE_KEY` is a public build-time variable. Ensure it is available during the production build. The Hostinger API token and Turnstile secret must remain private server-side environment variables.

After changing environment variables, rebuild or restart the application using the approved Hostinger deployment process.

## 6. Delivery and troubleshooting

The application expects HTTP `204` from the Hostinger Mail API for successful delivery.

The application uses a timeout and returns generic public-facing errors for provider failures. It does not expose raw provider responses or credentials to website visitors.

When troubleshooting:

- Check that the mailbox resource ID is correct.
- Check that the API token is valid and authorised.
- Confirm the mailbox can send mail.
- Check the Hostinger application logs without enabling request-body or credential logging.
- Check the receiving mailbox's inbox and spam folder.

A successful API response indicates that the provider accepted the request; it does not guarantee inbox placement.

## 7. Recommended Cloudflare edge rate limiting

Consider adding a Cloudflare rate-limiting rule for:

- Method: `POST`
- Path: `/api/enquiries`
- Counting characteristic: source IP
- Initial example threshold: 5 requests in 10 seconds

Choose a suitable mitigation period and review false positives before tightening the rule.

The application also has in-process rate limits. These are secondary controls: they reset on process restart and are not shared across multiple application instances.

Cloudflare rule capabilities vary by plan. Confirm available expression fields, thresholds, and mitigation actions in the account's rule editor. This repository does not create or modify Cloudflare rules.