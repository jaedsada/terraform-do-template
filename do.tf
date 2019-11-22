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

    provisioner "remote-exec" {
        inline = [
          "export PATH=$PATH:/usr/bin",
          "sudo apt-get update",
          "sudo apt-get -y install nginx",
        ]

        connection {
          type     = "ssh"
          private_key = "${file("~/.ssh/id_rsa")}"
          user     = "root"
          timeout  = "2m"
          host = "${digitalocean_droplet.droplet.ipv4_address}"
        }
    }
}
