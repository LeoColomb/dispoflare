# Dispoflare

> Disposable email addresses on the fly powered by Cloudflare

## About

Dispoflare is an app using Cloudflare products to host and manage disposable email addresses.

### Features

* ➕ Generate new email addresses at any time (via [Email Router](https://developers.cloudflare.com/email-routing/))
  * 🔀 Random or user-defined username
* 📅 Handle expiration dates (via [Cron Triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/))
  * ⏲️ Optional deprecation period (via [Email Workers](https://developers.cloudflare.com/email-routing/email-workers/))
  * 🗃️ Optional archived period with possible remediation
  * 🗑️ Automatic clean up delay

### Cloudflare Platform

* Email routing: [Cloudflare Email Routing](https://www.cloudflare.com/products/email-routing/)
* Hosting: [Cloudflare Pages](https://pages.cloudflare.com/)
* Backend end: [Cloudflare Workers](https://workers.cloudflare.com/)
* Authentication: [Cloudflare Access](https://www.cloudflare.com/products/zero-trust/access/)

## Requirements

* Free Cloudflare account (or above)
* One domain (or more), DNS-managed by Cloudflare

## Usage

* Create a [Cloudflare Pages project](https://pages.dev/) with Direct Upload option
  * Set a GitHub Actions variables `PROJECT_NAME` with this Cloudflare Pages project name
  * Set a GitHub Actions secret `CF_ACCOUNT_ID` with the Cloudflare Account ID this project relates
* Create a Cloudflare API Token with Cloudflare Pages Edit permission
  * Set a GitHub Actions secret `CF_API_TOKEN` with this token value
* Trigger a GitHub Actions run for the Deploy workflow
* (Optionnal) Enable access restrictions with Cloudflare Access in the Cloudflare Pages project settings

## License

This project is licensed under [MIT License](LICENSE).
