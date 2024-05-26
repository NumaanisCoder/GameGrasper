
import ConnectDb from '@/middleware/mongoose';
import { user } from '@/models/User';
import jwt from "jsonwebtoken";


const handler = async (req, res) => {

    const { query } = req;
    console.log(query.token);

   const email =  jwt.verify(query.token, process.env.NEXT_PUBLIC_JSON_KEY).email;
   console.log("email is",email);

   const userofemail = await user.findOne({email: email});

   userofemail.verify = true;

   await userofemail.save();
console.log(userofemail);

    res.status(200).json({
        message:"OK"
    })
    
};
export default handler;
