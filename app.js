const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get('/',function(req,res){
  res.sendFile(__dirname+"/index.html");
})


app.post('/',function(req,res){
  const firstName=req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const data = {
    members : [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/fbf0905d41";
  const options={
    method :"POST",
    auth: "SatyaPrakash:722589c30f9874997eea564a2637cf31-us1"
  }
  const request = https.request(url,options,function(response){
    if(response.statusCode == 2002) {
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
  })
  request.write(jsonData);
  request.end();
})

app.post('/fail',function(req,res){
  res.redirect('/');
})


app.listen(3000,function(){
  console.log("Server is running at port 3000");
})
