# Dispo<em>flare</em>

> Disposable email addresses on the fly powered by Cloudflare

## About

Dispoflare is an app using Cloudflare products to host and manage disposable email addresses.

### Features

- ➕ Generate new email addresses at any time (via [Email Router](https://developers.cloudflare.com/email-routing/))
  - 🔀 Random or user-defined username
- 📅 Handle expiration dates (via [Cron Triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/))
  - ⏲️ Optional deprecation period (via [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/))
  - 🗃️ Optional archived period with possible remediation
  - 🗑️ Automatic clean up delay

### Cloudflare Platform

- Email routing: [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/)
- Hosting: [Cloudflare Pages](https://pages.cloudflare.com/)
- Backend end: [Cloudflare Workers](https://workers.cloudflare.com/)
- Authentication: [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/)

## Usage

### Requirements

- Make sure you have a Cloudflare account. A free account is suffiscient.
- At least one domain name must be DNS-managed by your Cloudflare account.

### Automatic

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/LeoColomb/dispoflare)

Make sure your Cloudflare API Token has the following permissions:
|   |   |   |
|---|---|---|
|Account|Email Routing Addresses|Read|
|Zone|Email Routing Rules|Edit|
|Zone|Zone|Read|

Optionaly but recommanded, setup access restrictions with Cloudflare Access for your app.

### Manual

- Run `npm i` in your terminal to install all dependencies
- Run `npm run deploy` to publish your worker
- Create a Cloudflare API Token with following permissions:
  |   |   |   |
  |---|---|---|
  |Account|Email Routing Addresses|Read|
  |Zone|Email Routing Rules|Edit|
  |Zone|Zone|Read|

- (Optional, recommanded) Setup access restrictions with Cloudflare Access for your app.

## Development

- Run `npm i` in your terminal to install all dependencies
- Run `npm run start` in your terminal to start a development server
- Open a browser tab at http://localhost:8787/ to see your worker in action

## License

This project is licensed under [MIT License](LICENSE).
