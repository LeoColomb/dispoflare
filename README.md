![Dispoflare Illustration](.design/illustration.svg)

# Dispo<em>flare</em>

> Disposable email addresses on the fly powered by Cloudflare

## Features

- ➕ Generate new email addresses at any time (via [Email Router](https://developers.cloudflare.com/email-routing/))
  - 🔀 Random or user-defined username
- 📅 Handle expiration dates (via [Cron Triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/))
  - ⏲️ Optional deprecation period (via [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/))
  - 🗃️ Optional archived period with possible remediation
  - 🗑️ Automatic clean up delay

## About

Dispoflare is an app using Cloudflare products to host and manage disposable email addresses.

- Email routing: [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/)
- Static hosting: [Cloudflare Pages](https://pages.cloudflare.com/)
- Backend functions: [Cloudflare Workers](https://workers.cloudflare.com/)
- Authentication: [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/)

## Getting started

### Requirements

Dispoflare is a full-stack app running on top of Cloudflare platform.
We are of course assuming that you have:

- A Cloudflare account (click [here](https://dash.cloudflare.com/sign-up) if you don't)
- At least one [zone](https://www.cloudflare.com/learning/dns/glossary/dns-zone/) using Cloudflare.
  If you don't have a zone, you can use [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/).

All the used Cloudflare products offer a [free plan](https://www.cloudflare.com/plans/) that allows to try them for personal or hobby projects.

### Deploy

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/LeoColomb/dispoflare&authed=true&apiTokenTmpl=%5B%7B%22key%22%3A%22page%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22workers_kv_storage%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22access%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22email_routing_address%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22email_routing_rule%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22zone%22%2C%22type%22%3A%22read%22%7D%2C%7B%22key%22%3A%22zone_settings%22%2C%22type%22%3A%22read%22%7D%5D&apiTokenName=Dispoflare)

Please pay attention to all the steps involved in the installation process.

- Authorize Workers to use your GitHub account.
- Enter your **Account ID** (from the previous section)
- Press the **Create token** button first, to create it, it will redirect you to a token template with all the required permissions pre-configured.
  Then enter the **API token** in the form.
- Fork the repository into your personal GitHub account.
- Enable GitHub Actions.
- Deploy.

### Access Policy

> **Warning**
> Dispoflare has no user registration.

Dispoflare uses [Zero Trust Access](https://www.cloudflare.com/products/zero-trust/access/) to handle user authentication.
It assumes that your users will register with another identity provider (Zero Trust supports [many providers](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/) or your custom one that implements [Generic SAML 2.0](https://developers.cloudflare.com/cloudflare-one/identity/idp-integration/generic-saml/)).

## Development & Contributions

### Codespaces

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=586503021)

This repository is ready for [Development Containers](https://containers.dev/).
Click the badge above to create a codespace for this repository and start making and submitting changes.

### Local

- Run `npm i` in your terminal to install all dependencies
- Run `npm run start` in your terminal to start a development server
- Open a browser tab at http://localhost:8787/ to see your worker in action

## License

This project is licensed under [MIT License](LICENSE).
