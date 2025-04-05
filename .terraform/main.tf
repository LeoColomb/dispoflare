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
      version = "~> 5.1"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

resource "cloudflare_workers_kv_namespace" "terraform_state" {
  account_id = var.cloudflare_account_id
  title = "dispoflare-terraform-state"
}

resource "cloudflare_workers_kv_namespace" "dispoflare_production_settings" {
  account_id = var.cloudflare_account_id
  title = "dispoflare-production-settings"
}

resource "cloudflare_workers_kv_namespace" "dispoflare_preview_settings" {
  account_id = var.cloudflare_account_id
  title = "dispoflare-preview-settings"
}

resource "cloudflare_pages_project" "dispoflare_pages_project" {
  account_id = var.cloudflare_account_id
  name              = "dispoflare"
  production_branch = "main"

  deployment_configs = {
    production = {
      env_vars = {
        CLOUDFLARE_ACCOUNT_ID = {
          type = "plain_text"
          value = sensitive(var.cloudflare_account_id)
        }
        CLOUDFLARE_API_TOKEN = {
          type = "plain_text"
          value = sensitive(var.cloudflare_api_token)
        }
        SENTRY_DSN = {
          type = "plain_text"
          value = sensitive(try(var.sentry_dsn, ""))
        }
      }

      kv_namespaces = {
        KV_SETTINGS = {
          namespace_id = sensitive(cloudflare_workers_kv_namespace.dispoflare_production_settings.id)
        }
      }
    }

    preview = {
      env_vars = {
        CLOUDFLARE_ACCOUNT_ID = {
          type = "plain_text"
          value = sensitive(var.cloudflare_account_id)
        }
        CLOUDFLARE_API_TOKEN = {
          type = "plain_text"
          value = sensitive(var.cloudflare_api_token)
        }
        SENTRY_DSN = {
          type = "plain_text"
          value = sensitive(try(var.sentry_dsn, ""))
        }
      }

      kv_namespaces = {
        KV_SETTINGS = {
          namespace_id = sensitive(cloudflare_workers_kv_namespace.dispoflare_preview_settings.id)
        }
      }
    }
  }
}

resource "cloudflare_zero_trust_access_application" "dispoflare_production_access" {
  account_id                = var.cloudflare_account_id
  name                      = "Dispoflare (Production)"
  domain                    = cloudflare_pages_project.dispoflare_pages_project.subdomain
  type                      = "self_hosted"
  session_duration          = "730h"
  auto_redirect_to_identity = false
}

resource "cloudflare_zero_trust_access_application" "dispoflare_preview_access" {
  account_id                = var.cloudflare_account_id
  name                      = "Dispoflare (Preview)"
  domain                    = "*.${cloudflare_pages_project.dispoflare_pages_project.subdomain}"
  type                      = "self_hosted"
  session_duration          = "730h"
  auto_redirect_to_identity = false
}
