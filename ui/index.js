const express       = require("express")
const app           = express();
const auth          = require("thnovice-auth")
const exception     = require("thnovice-exception")
var shell = require('shelljs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(auth.auth)

app.post("/tf-do/create",auth.authMiddleware,(req,res)=>{
    let do_token = req.body.do_token
    let pub_key = req.body.pub_key
    let pvt_key = req.body.pvt_key
    let ssh_fingerprint = req.body.ssh_fingerprint
    let droplet_name = req.body.droplet_name
    let droplet_size = req.body.droplet_size
    let droplet_image = req.body.droplet_image
    let droplet_region = req.body.droplet_region

    let init = shell.exec('terraform init')
    let bash = `terraform apply -var=do_token=${do_token} \
                -var=pub_key=${pub_key} \
                -var=pvt_key=${pvt_key} \
                -var=ssh_fingerprint=${ssh_fingerprint} \
                -var=droplet_name=${droplet_name} \
                -var=droplet_size=${droplet_size} \
                -var=droplet_image=${droplet_image} \
                -var=droplet_region=${droplet_region} \
                --auto-approve`

    let ls = shell.exec(bash)
    res.json(ls)
})

app.listen(3000)