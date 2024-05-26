import jwt from "jsonwebtoken";
import NodeCache from "node-cache";
import { parseCookies } from 'nookies';

// Assuming user model is correctly exported
import  ConnectDb  from "@/middleware/mongoose";
import { Blog } from "@/models/Blog";
import { user } from "@/models/User";
import { comment } from "@/models/Comment";


const cache = new NodeCache();

const handler = async (req, res) => {
    try {
        const cookies = parseCookies({ req });
        const { message, blogid } = req.body;

        // Verify JWT token to get user ID
        const userid = await jwt.verify(cookies.token, process.env.NEXT_PUBLIC_JSON_KEY);

        console.log(userid.id);
        const userOfComment = await user.findById(userid.id);
        // console.log("USER OF COMMENT : ",userOfComment);

        const username = await userOfComment.username;

        // Find blog by ID and populate its comments
        // console.log(blogid);
        const blog = await Blog.findById(blogid).populate('comment');


        // Create a new comment document
        const commentDoc = new comment({ message, username });
        commentDoc.blog = blog;

        // Push the comment into the blog's comments array
        await blog.comment.push(commentDoc);

        // Save the new comment and update the blog
        await commentDoc.save();
        await blog.save();

        res.status(200).json({
            message: "Comment uploaded successfully",
            username: username
        });
    } catch (error) {
        console.error("Error uploading comment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export default ConnectDb(handler);
