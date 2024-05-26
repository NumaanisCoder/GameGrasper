// Importing required modules
import ConnectDb from "@/middleware/mongoose";
import getToken from "@/lib/tokenprovider";
const { user } = require("@/models/User"); // Corrected model import to use capital "User"
const { setCookie } = require("nookies");

// Define the request handler function
const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
    
const {email,displayName} = req.body;

    console.log(`Email from Google : ${email} \n displayName: ${displayName}`);

    try {
        // Check if a user with the given email already exists in the database
        const alreadyExists = await user.findOne({ email: email });
    
        if (alreadyExists) {
             // Generate a token for the new user
        const token = getToken(alreadyExists.id);

        // Set the token as a cookie
        setCookie({ res }, 'token', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            sameSite: 'strict'
        });
            return res.status(400).json({ message: 'Login in Sucessfully',success:true });
        }

        // Create a new user in the database
        const newUser = new user({ username: displayName.trim(), email, password: displayName.trim() });
        await newUser.save();

        // Generate a token for the new user
        const token = getToken(newUser.id);

        // Set the token as a cookie
        setCookie({ res }, 'token', token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
            sameSite: 'strict'
        });

        // Respond with success message or data if needed
        return res.status(200).json({ message: 'User created successfully',success:true});
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Server Error' });
    }
};

// Connect the request handler to the database
export default ConnectDb(handler);
