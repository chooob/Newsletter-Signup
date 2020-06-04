const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const https = require("https");


app.use(express.urlencoded());
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

  var data = {

    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  }

  var jsonData = JSON.stringify(data)
  var url = "https://us19.api.mailchimp.com/3.0/lists/598546768f";
  var options = {
    method:"POST",
    auth: "blah:68be8edbc3294cc9c44a06867d97678b-us19"
  }
  var request = https.request(url,options,function(response){

    //determine if successful or not send message regardless
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
      // res.write("successful");
      // res.end();
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  //back to whatever page you came from other options avaliable such as ".." "/" and "http://www.google.com"
  res.redirect("http://www.google.com");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is runniong port 3000");
})
// apikey
// 68be8edbc3294cc9c44a06867d97678b-us19
//list
//598546768f
//https://salty-everglades-02590.herokuapp.com/
