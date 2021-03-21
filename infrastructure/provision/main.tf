resource "null_resource" "remote_exec_from_github" {

 connection {
  host = "${var.host}"
  type = "ssh" 
  user = "ubuntu" 
  private_key = "${file("/Users/krutik/Documents/Northeastern Courses/DevOps/Keys/aws_terraform")}"
 }
 
 provisioner "remote-exec" {
  inline = [
      "mkdir /home/ubuntu/uber",
      "cd /home/ubuntu/uber",
      "git clone https://github.com/ktkrutik/DevOps_MidTerm.git",
      "cd DevOps_MidTerm",
      "rm -r infrastructure",
      "cd uberBE",
      "sudo cp /home/ubuntu/uber/DevOps_MidTerm/uberBE/uber.service /etc/systemd/system/",
      "sudo apt update",
      "sudo apt install python3-pip python3-dev build-essential libssl-dev libffi-dev python3-setuptools -y",
      "sudo apt install python3-venv -y",
      "python3 -m venv .venv",
      "source .venv/bin/activate",
      "pip3 install flask",
      "pip3 install pymongo",
      "pip3 install flask-cors",
      "pip3 install flask-api",
      "pip3 install requests",
      "pip3 install dnspython",
      "pip3 install pytz",
      "pip3 install gunicorn",
      "pip3 install python-dateutil --upgrade",
      "pip3 install python-dotenv",
      "sudo systemctl daemon-reload",
      "sudo systemctl start uber", 
      "cd ..",
      "cd uberFE",
      "sudo apt install -y nodejs",
      "sudo apt install -y npm",
      "sudo npm install -g npm@latest",
      "sudo npm install -g n",
      "sudo n 12.16.1",
    # #  "npm install",
      "npm --force install",
      "npm run build",
      "sudo apt install nginx -y",
      "sudo rm /etc/nginx/sites-enabled/default",
      "sudo cp /home/ubuntu/uber/DevOps_MidTerm/uberFE/uber.nginx /etc/nginx/sites-available/",
      "sudo chmod 777 /etc/nginx/sites-available/uber.nginx",
      "sudo ln -s /etc/nginx/sites-available/uber.nginx /etc/nginx/sites-enabled/uber.nginx",
      "sudo systemctl reload nginx"
  ]
 }
}