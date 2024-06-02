import { sendResetLink } from "@/lib/EmailSender";
import ConnectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { user } from "@/models/User";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { ConfirmPassword, token } = req.body;

    if (!ConfirmPassword || !token) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const { email } = jwt.verify(token, process.env.NEXT_PUBLIC_JSON_KEY);

    console.log("Email is", email);

    const userofemail = await user.findOne({email:email});

    if (!userofemail) {
      return res.status(404).json({ message: "User not found" });
    }

    userofemail.password = await bcrypt.hash(ConfirmPassword, 12);

    await userofemail.save();

    res.status(200).json({
        status:200,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default ConnectDb(handler);
