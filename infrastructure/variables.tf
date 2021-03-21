variable "aws_region" {
  default = "us-east-1"
}

variable "subnet1_cidr" {
    default = "10.0.1.0/24"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "ec2_sg_name" {
  default = "application"
}

variable "route_cidr" {
  default = "0.0.0.0/0"
}

variable "ssh_port" {
  default = 22
}

variable "tcp_protocol" {
  default = "tcp"
}

variable "http_port" {
  default = 80
}

variable "react_port" {
  default = 3000
}

variable "py_port" {
  default = 5000
}

variable "ec2_inst_type" {
  default = "t2.micro"
}

variable "keyPair_name" {
  default = "dev_key"
}
