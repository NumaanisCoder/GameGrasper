import nodemailer from 'nodemailer';
import getEmailToken from './emailToken';


const verifyEmail = async function(email){
  const token = getEmailToken(email);
    const mailTransporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {
          user: "nkblogs.no.reply@gmail.com",
          pass: "cqqrpnrlqrrmfwol",
        },
      },
    
     
    );
    const details = {
      from: "nkblogs.no.reply@gmail.com",
      to:`${email}`,
      subject: "Verify Your Email",
      html: `
      <body style="background-color: black;">
      <div style="text-align: center;">
      <br>
      <h1 style="background-color: #f2f2f2; color: #020546;"> RelaxByte </h1> 
       
      <h2 style="background-color: aliceblue;">Verify Your Email</h2>
      <p style="background-color: #020546;">
     <a style="padding: 10px 15px; background-color: #f2f2f2; color: "black"; " href="https://www.relaxbyte.com/accounts/verify/${token}" > Verify Email </a>
     <br>
          
      <br>
      </p>
      <br>
      </div>
      </body>`
    };
    await mailTransporter.sendMail(details);
  };
  
export default verifyEmail;