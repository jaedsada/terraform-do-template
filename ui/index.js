const express       = require("express")
const app           = express();
const auth          = require("thnovice-auth")
const exception     = require("thnovice-exception")
var shell = require('shelljs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(auth.auth)


function setInput( request ){
    return {
        "do_token" : request.body.do_token,
        "pub_key" : request.body.pub_key,
        "pvt_key" : request.body.pvt_key,
        "ssh_fingerprint" : request.body.ssh_fingerprint,
        "droplet_name" : request.body.droplet_name,
        "droplet_size" : request.body.droplet_size,
        "droplet_image" : request.body.droplet_image,
        "droplet_region" : request.body.droplet_region
    }
}
function bashFormat( plan ){
    let format = `terraform apply \
    -var "do_token=${data.do_token}" \
    -var "pub_key=${data.pub_key}" \
    -var "pvt_key=${data.pvt_key}" \
    -var "ssh_fingerprint=${data.ssh_fingerprint}" \
    -var "droplet_name=${data.droplet_name}" \
    -var "droplet_size=${data.droplet_size}" \
    -var "droplet_image=${data.droplet_image}" \
    -var "droplet_region=${data.droplet_region}" \
    --auto-approve`
    return
}
app.post("/tf-do/create",auth.authMiddleware,(req,res)=>{
    let data = setInput(req)
    
    let bashFormat = `terraform apply \
                -var "do_token=${data.do_token}" \
                -var "pub_key=${data.pub_key}" \
                -var "pvt_key=${data.pvt_key}" \
                -var "ssh_fingerprint=${data.ssh_fingerprint}" \
                -var "droplet_name=${data.droplet_name}" \
                -var "droplet_size=${data.droplet_size}" \
                -var "droplet_image=${data.droplet_image}" \
                -var "droplet_region=${data.droplet_region}" \
                --auto-approve`

    shell.exec("terraform init").toString()
    shell.exec(`terraform plan \
    -var "do_token=${data.do_token}" \
    -var "pub_key=${data.pub_key}" \
    -var "pvt_key=${data.pvt_key}" \
    -var "ssh_fingerprint=${data.ssh_fingerprint}" \
    -var "droplet_name=${data.droplet_name}" \
    -var "droplet_size=${data.droplet_size}" \
    -var "droplet_image=${data.droplet_image}" \
    -var "droplet_region=${data.droplet_region}"
    `).toString()

    let run = shell.exec(bashFormat).toString()
    let output = shell.exec("cat $PWD/out.json").toString()
    res.json(output)
})
app.get("/tf-do/show",auth.authMiddleware,(req,res)=>{
    let data = shell.exec('terraform output').toString()
    res.send(data)
})
app.post("/tf-do/delete",auth.authMiddleware,(req,res)=>{
    let data = setInput(req)
    
    let bashFormat = `terraform destroy \
                -var=do_token=${data.do_token} \
                -var=pub_key=${data.pub_key} \
                -var=pvt_key=${data.pvt_key} \
                -var=ssh_fingerprint=${data.ssh_fingerprint} \
                -var=droplet_name=${data.droplet_name} \
                -var=droplet_size=${data.droplet_size} \
                -var=droplet_image=${data.droplet_image} \
                -var=droplet_region=${data.droplet_region} \
                --auto-approve`

    let run = shell.exec(bashFormat).toString()
    res.json(run)
})

app.listen(3000)