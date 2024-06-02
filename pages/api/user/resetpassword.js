import { sendResetLink } from "@/lib/EmailSender";
import { user } from "@/models/User";

const { default: ConnectDb } = require("@/middleware/mongoose");


const handler = async (req,res) => {

    const {email} = req.body;
    const userofemail = await user.findOne({email:email});
    if(!userofemail){
        res.status(400).json({
            message:"User not found",
            status: 400
        })
        return;
    }

    await sendResetLink(email);

    res.status(200).json({
        message:"OK ",
        status: 400
    })
}

export default ConnectDb(handler);