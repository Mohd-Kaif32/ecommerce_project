const nodeMailer=require("nodemailer");

const sendEmail=async(options)=>{
console.log(4);
    const transporter=nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        service:process.env.SMPT_SERVICE,
      
        auth:{
            user:process.env.SMPT_MAIL,
            password:process.env.SMPT_PASSWORD,
        }
    });
    console.log(9);
    const mailOptions={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    console.log(22);
    await transporter.sendMail(mailOptions);
console.log(25);
};

module.exports=sendEmail;
