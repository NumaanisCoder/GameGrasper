import { sendResetLink } from "@/lib/EmailSender";

const { default: ConnectDb } = require("@/middleware/mongoose");


const handler = async (req,res) => {

    const {email} = req.body;
    console.log("Email from frontend is ",email);

    await sendResetLink(email);
    res.status(200).json({
        message:"OK "
    })
}

export default ConnectDb(handler);