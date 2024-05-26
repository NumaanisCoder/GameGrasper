import { user } from "@/models/User";
import bcrypt from "bcrypt";
import ConnectDb from "@/middleware/mongoose";
import getToken from "@/lib/tokenprovider";
import verifyEmail from "@/lib/EmailSender";
import { setCookie } from "nookies";



const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log(email, password);

  try {
    const nuser = await user.findOne({ email: email });

    if(!nuser){
        res.json({
            message: "Email is not registered",
            status: 404,
          });

          return;
    }

    const authenticated = await bcrypt.compare(password, nuser.password);

    if (authenticated) {
      const token = getToken(nuser.id);
      // Set the token as a cookie using nookies
    
      res.json({
        message: "Login Sucessfully",
        status: 200,
        token: token
      });
      return;
    } else if (!authenticated) {
      res.json({
        message: "Password Does not matched",
        status: 402,
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error",error:error });
  }
};

export default ConnectDb(handler);
