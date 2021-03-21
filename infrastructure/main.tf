provider "aws" {
  region  = var.aws_region
  version = "~> 2.7"
}

# Create key pair
resource "aws_key_pair" "deployer" {
  key_name   = "deployer-key"
  public_key = file("/Users/krutik/Documents/Northeastern Courses/DevOps/Keys/aws_terraform.pub")
}

# Create VPC
resource "aws_vpc" "vpc-1" {
    cidr_block              = "${var.vpc_cidr}"
    enable_dns_hostnames    = true
    enable_dns_support      = true
    enable_classiclink_dns_support = true
    assign_generated_ipv6_cidr_block = false
    
    tags = {
      Name = "csye7220-vpc"
    }
}

# Create Subnet1
resource "aws_subnet" "subnet-1" {
    cidr_block              = "${var.subnet1_cidr}"
    vpc_id                  = aws_vpc.vpc-1.id
    
    tags = {
        Name = "csye7220-subnet-1"
    }
}


# Create Internet Gateway
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc-1.id
  
  tags = {
    Name = "csye7220-gateway"
  }
}



# Create Route Table
resource "aws_route_table" "rt" {
  vpc_id = aws_vpc.vpc-1.id

  tags = {
    Name = "csye7220-route-table"
  }
}


# Create Association between Route Table and Subnets
resource "aws_route_table_association" "rta-a" {
  subnet_id      = aws_subnet.subnet-1.id
  route_table_id = aws_route_table.rt.id
}



# Create EC2 security group for your EC2 instances
resource "aws_security_group" "ec2-sg" {
  vpc_id       = aws_vpc.vpc-1.id
  name         = "${var.ec2_sg_name}"
  
#   allow ingress of port 22
  ingress {
    cidr_blocks = ["${var.route_cidr}"]
    from_port   = "${var.ssh_port}"
    to_port     = "${var.ssh_port}"
    protocol    = "${var.tcp_protocol}"
  } 

#   allow ingress of port 80
  ingress {
    cidr_blocks = ["${var.route_cidr}"]
    from_port   = "${var.http_port}"
    to_port     = "${var.http_port}"
    protocol    = "${var.tcp_protocol}"
  } 

  # allow ingress of port 3000
  ingress {
    from_port   = "${var.react_port}"
    to_port     = "${var.react_port}"
    protocol    = "${var.tcp_protocol}"
    cidr_blocks = ["${var.route_cidr}"]
  } 

    # allow ingress of port 5000
  ingress {
    # cidr_blocks = ["${var.route_cidr}"]
    from_port   = "${var.py_port}"
    to_port     = "${var.py_port}"
    protocol    = "${var.tcp_protocol}"
    cidr_blocks = ["${var.route_cidr}"]
  } 

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["${var.route_cidr}"]
  }
  
  tags = {
    Name = "csye7220-ec2-security-group"
  }
}


# Create a EC2 instance
resource "aws_instance" "ec2-instance" {
  ami = "ami-042e8287309f5df03"
  instance_type = "${var.ec2_inst_type}"
  key_name = "${var.keyPair_name}"
  subnet_id = aws_subnet.subnet-1.id
  vpc_security_group_ids = [aws_security_group.ec2-sg.id]

  tags = {
    Name = "csye7220-ec2-instance"
  }
}

