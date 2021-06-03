const express = require("express")
const https = require("https")

const app = express()

app.use(express.urlencoded())
app.use(express.static("public"))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/902ae252f9";

    const options = {
        method: "POST",
        auth: "rashmiraj:d406ad03e963f1a20e2db21e6a224731-us6"
    }
    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
    })
    request.write(jsonData)
    request.end()
})

app.post("/failure", function(req, res) {
    res.redirect("/")
})

// API key of Mailchimp
// API Key d406ad03e963f1a20e2db21e6a224731-us6

// List ID: 902ae252f9

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is started on port 3000.");
})