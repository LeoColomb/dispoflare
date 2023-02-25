variable "cloudflare_account_id" {
  type = string
  sensitive = true
}

variable "cloudflare_api_token" {
  type = string
  sensitive = true
}

variable "sentry_dsn" {
  type = string
  sensitive = true
}

terraform {
  required_providers {
    cloudflare = {
      source = "cloudflare/cloudflare"
      version = "3.31.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_pages_project" "dispoflare_pages_project" {
  account_id = var.cloudflare_account_id
  name              = "dispoflare"
  production_branch = "main"

  deployment_configs {
    production {
      environment_variables = {
        CLOUDFLARE_ACCOUNT_ID = sensitive(var.cloudflare_account_id)
        CLOUDFLARE_API_TOKEN = sensitive(var.cloudflare_api_token)
        SENTRY_DSN = sensitive(var.sentry_dsn)
      }

      compatibility_date = "2023-02-25"
    }

    preview {
      environment_variables = {
        CLOUDFLARE_ACCOUNT_ID = sensitive(var.cloudflare_account_id)
        CLOUDFLARE_API_TOKEN = sensitive(var.cloudflare_api_token)
        SENTRY_DSN = sensitive(var.sentry_dsn)
      }
    }
  }
}

resource "cloudflare_access_application" "dispoflare_production_access" {
  account_id                = var.cloudflare_account_id
  name                      = "Dispoflare (Production)"
  domain                    = cloudflare_pages_project.dispoflare_pages_project.subdomain
  type                      = "self_hosted"
  session_duration          = "730h"
  auto_redirect_to_identity = false
}

resource "cloudflare_access_application" "dispoflare_preview_access" {
  account_id                = var.cloudflare_account_id
  name                      = "Dispoflare (Previews)"
  domain                    = "*.${cloudflare_pages_project.dispoflare_pages_project.subdomain}"
  type                      = "self_hosted"
  session_duration          = "730h"
  auto_redirect_to_identity = false
}
