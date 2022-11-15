const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("")// put my api key, sharedon whatsapp

const fs = require("fs");
pathToAttachment = `${__dirname}\\demoImg.jpg`;
console.log(pathToAttachment);
attachment = fs.readFileSync(pathToAttachment).toString("base64");

const msg = {
  to: 'nileshvishwakarma51123@gmail.com', //recipient
  cc: 'sontiya.nayan@gmail.com', //recipient
  from: 'nileshvishwakarma51@gmail.com', // sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>Hello, </strong>',
  attachments: [
    {
      filename: 'demo image.jpeg',
      contentType: 'image/jpeg',
      content: attachment,
      disposition:'attachment'
    },
    {
      filename: 'trial image.jpeg',
      contentType: 'image/jpeg',
      content: attachment,
      disposition:'attachment'
    }
  ]
}
sgMail
  .send(msg)
  .then((res) => {
    console.log("mail sent")
  })
  .catch((error) => {
    console.error(error)
  })
