# infra/terraform/variables.tf

variable "project_name" {
  description = "The base name for all ReadyCheck resources"
  type        = string
  default     = "readycheck"
}

variable "environment" {
  description = "The deployment environment (e.g. dev, staging, prod)"
  type        = string
  default     = "staging"
}

variable "aws_region" {
  description = "AWS region for infrastructure deployment"
  type        = string
  default     = "us-east-1"
}

variable "base_domain" {
  description = "The root domain used for Web and API endpoints"
  type        = string
  default     = "readycheck.org"
}

# --- Container Images ---

variable "web_image_tag" {
  description = "The Docker image tag for the Next.js Web Dashboard"
  type        = string
  default     = "latest"
}

variable "api_image_tag" {
  description = "The Docker image tag for the API Gateway service"
  type        = string
  default     = "latest"
}

# --- Resource Sizing ---

variable "db_instance_class" {
  description = "The instance type for the RDS Postgres database"
  type        = string
  default     = "db.t3.medium"
}

variable "ecs_task_cpu" {
  description = "CPU units for the ECS tasks (1024 = 1 vCPU)"
  type        = number
  default     = 512
}

variable "ecs_task_memory" {
  description = "Memory in MiB for the ECS tasks"
  type        = number
  default     = 1024
}

# --- Feature Toggles ---

variable "enable_redis_cache" {
  description = "Whether to provision an ElastiCache Redis instance for sync queues"
  type        = boolean
  default     = true
}

variable "enable_bastion_host" {
  description = "Flag to enable a jump host for database maintenance in private subnets"
  type        = boolean
  default     = false
}
