# infra/terraform/main.tf
```hcl
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# --- Variables ---

variable "aws_region" {
  description = "AWS Region to deploy ReadyCheck resources"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Execution environment (staging/prod)"
  type        = string
  default     = "staging"
}

variable "project_name" {
  description = "Base name for all resources"
  type        = string
  default     = "readycheck"
}

# --- Networking ---

module "vpc" {
  source = "./modules/vpc" # Placeholder for a standard VPC module

  name        = "${var.project_name}-vpc-${var.environment}"
  cidr_block  = "10.0.0.0/16"
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24"]
}

# --- Compute (Container / App Hosting) ---

resource "aws_ecs_cluster" "readycheck_cluster" {
  name = "${var.project_name}-cluster-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# --- Database & Cache ---

resource "aws_db_instance" "postgres" {
  identifier        = "${var.project_name}-db-${var.environment}"
  engine            = "postgres"
  engine_version    = "15.3"
  instance_class    = "db.t3.medium"
  allocated_storage = 20
  
  # Placeholder for security group and subnet mapping
  # db_subnet_group_name   = module.vpc.database_subnet_group
  # vpc_security_group_ids = [aws_security_group.db_sg.id]

  skip_final_snapshot = true
}

# --- Outputs ---

output "ecs_cluster_name" {
  value = aws_ecs_cluster.readycheck_cluster.name
}

output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}
```
