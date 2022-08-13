import express from "express";
import ssr from "./ssr.js"
import nodemailer from "nodemailer";

const app = express();

app.use(express.static("../Client/Public/"));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(ssr.home_page)
});

app.get("/cv", (req, res) => {
    res.send(ssr.cv_page)
});

app.get("/about", (req, res) => {
    res.send(ssr.about_page)
});

app.get("/contact", (req, res) => {
    res.send(ssr.contact_page)
})

app.post("/sendmail", async (req, res) => {
    const { name, email, message } = req.body
    //console.log("CHECK CHECK", name, email, message)
    sendMail(name, email, message);

});


function sendMail(name, email, message) {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alexhaubro@gmail.com',
            pass: 'jmubblequoohathh'
        }
    });

    let mailDetails = {
        from: 'alexhaubro@gmail.com',
        to: 'alex_haubro@hotmail.com',
        subject: 'Spørgsmål fra ' + name,
        html: '<p> Afsender: </p>' + email + ", Spørgsmål: " + message
    };

    mailTransporter.sendMail(mailDetails, function (err) {
        if (err) throw err;
    });
}


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log("App running on port", PORT)
});