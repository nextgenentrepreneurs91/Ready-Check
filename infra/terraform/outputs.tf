# infra/terraform/outputs.tf
```hcl
output "environment" {
  description = "The deployment environment"
  value       = var.environment
}

output "vpc_id" {
  description = "The ID of the primary VPC"
  value       = module.vpc.vpc_id
}

output "ecs_cluster_name" {
  description = "The name of the ECS cluster for ReadyCheck services"
  value       = aws_ecs_cluster.readycheck_cluster.name
}

output "db_endpoint" {
  description = "The connection endpoint for the Postgres database"
  value       = aws_db_instance.postgres.endpoint
}

# --- Placeholder URLs (Assuming ALB implementation) ---

output "web_app_url" {
  description = "The public URL for the Next.js Web Dashboard"
  value       = "https://dashboard.${var.environment === "prod" ? "" : "${var.environment}."}readycheck.org"
}

output "api_url" {
  description = "The public URL for the API Gateway"
  value       = "https://api.${var.environment === "prod" ? "" : "${var.environment}."}readycheck.org/v1"
}
```
