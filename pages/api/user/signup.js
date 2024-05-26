import { user } from "@/models/User";
import bcrypt from "bcrypt";
import ConnectDb from "@/middleware/mongoose";
import getToken from "@/lib/tokenprovider";
import verifyEmail from "@/lib/EmailSender";
import { setCookie } from 'nookies';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { username, email, password } = req.body;
    console.log(username, email, password);

    try {
        const existingUserByUsername = await user.findOne({ username: username });
        const existingUserByEmail = await user.findOne({ email: email });

        if (existingUserByUsername) {
            return res.json({status:409, message: "Username is already taken" });
        }

        if (existingUserByEmail) {
            return res.json({ status:402, message: "Email is already registered" });
        }

        await verifyEmail(email);
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new user({ username, email, password: hashedPassword });
        await newUser.save();

        const token = getToken(newUser.id);
        // Set the token as a cookie using nookies
        setCookie({ res }, 'token', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            sameSite: "strict"
        });

        return res.status(200).json({ status:200,message: 'User registered successfully' });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default ConnectDb(handler);
