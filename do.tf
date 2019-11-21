provider "digitalocean" {
  token = "${var.do_token}"
}
 
resource "digitalocean_droplet" "droplet" {
    name = "${var.droplet_name}"
    image = "${var.droplet_image}"
    region = "${var.droplet_region}"
    size = "${var.droplet_size}"
    private_networking = false
    ssh_keys = [ "${var.ssh_fingerprint}" ]

    # connection {
    #   user = "root"
    #   type = "ssh"
    #   private_key = "${var.pvt_key}"
    #   timeout = "2m"
    #   host = "self.public_ip"
    # }
    # provisioner "remote-exec" {
    #     inline = [
    #         "export PATH=$PATH:/usr/bin",
    #         # install nginx
    #         "sudo apt-get update",
    #         "sudo apt-get -y install nginx"
    #     ]
    # }
}


# terraform plan \
#   -var "do_token=5dbb2393a7f89f1450421a500fe2f69e4727cd05e5cf69f2f25eb71439d4bd3e" \
#   -var "pub_key=$HOME/.ssh/id_rsa.pub" \
#   -var "pvt_key=$HOME/.ssh/id_rsa" \
#   -var "ssh_fingerprint=$SSH_FINGERPRINT"

