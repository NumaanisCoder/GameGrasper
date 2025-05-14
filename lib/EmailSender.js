import nodemailer from 'nodemailer';
import getEmailToken from './emailToken';


const verifyEmail = async function (email) {
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
    to: `${email}`,
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
export const sendResetLink = async function (email) {
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
    to: `${email}`,
    subject: "Verify Your Email",
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
       
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Spicy+Rice&display=swap');
      
        body { margin: 0; padding: 0; font-family: 'Oxanium', sans-serif; background-color: #0f0f12; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; padding: 20px 0; background-color: #0f0f12; }
        .logo { 
         font-family: "Spicy Rice", serif;
          color: white; 
          font-size: 32px; 
          font-weight: 700; 
        }
        .logo span { color: red; }
        .content { 
          background: #1a1a23; 
          padding: 30px; 
          border: 1px solid #2b2b3a;
        }
        h1 { 
          color: #f1faee; 
          font-size: 24px; 
          margin-top: 0; 
          text-align: center;
        }
        p { 
          color: #a8a8b3; 
          line-height: 1.6; 
          text-align: center;
        }
        .button { 
          display: block; 
          width: 200px;
          background: #e63946; 
          color: #f1faee !important; 
          padding: 14px 0; 
          border-radius: 4px; 
          text-decoration: none; 
          font-weight: 600; 
          margin: 25px auto; 
          text-align: center;
          transition: all 0.3s ease;
        }
        .button:hover {
          background: #f02d3d;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
        }
        .footer { 
          text-align: center; 
          margin-top: 30px; 
          color: #5a5a65; 
          font-size: 12px; 
        }
        .highlight { color: #e63946; font-weight: 600; }
        .pixel-divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #e63946, transparent);
          margin: 20px 0;
        }
        .warning {
          color: #ff9e00;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Game<span>Grasper</span>.online</div>
        </div>
        
        <div class="content">
          <h1>Password Reset Request</h1>
          <p>We received a request to reset your <span class="highlight">GameGrasper</span> password.</p>
          
          <div class="pixel-divider"></div>
          
          <p>Click the button below to set a new password:</p>
          
          <a href="https://gamegrasper.online/accounts/resetpassword/${token}" class="button">
            RESET PASSWORD
          </a>
          
          <p class="warning">This link will expire in 1 hour for security reasons.</p>
          <p>If you didn't request this password reset, please secure your account immediately.</p>
        </div>
        
        <div class="footer">
          © ${new Date().getFullYear()} GameGrasper.online | All Rights Reserved
        </div>
      </div>
    </body>
    </html>`
  };
  await mailTransporter.sendMail(details);
};

export default verifyEmail;