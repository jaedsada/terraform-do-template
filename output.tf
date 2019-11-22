output "name" {
  value = "${digitalocean_droplet.droplet.name}"
}
output "username" {
#   value = "${digitalocean_droplet.droplet.name}"
    value = "root"
}
output "public_ip" {
  value = "${digitalocean_droplet.droplet.ipv4_address}"
}





