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
export const sendResetLink = async function(email){
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
      <body style="background-color: black; margin: 0; padding: 0;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: rgb(220, 63, 20); padding: 6px 8px; display: inline-block;">
        Game<span style="color: white">Grasper</span>
      </h1>
      <h2 style="background-color: rgb(220, 63, 20); color: white; display: inline-block; padding: 10px;">
        Reset your password
      </h2>
      <p style="padding: 20px; color: white;">
        <a 
          style="padding: 10px 15px; background-color: #f2f2f2; color: black; text-decoration: none;" 
          href="https://${process.env.NEXT_PUBLIC_BASE_URL}/accounts/resetpassword/${token}"
        >
          Click Here
        </a>
      </p>
    </div>
  </body>`
    };
    await mailTransporter.sendMail(details);
  };
  
export default verifyEmail;