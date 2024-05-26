// Import the middleware
import ConnectDb from "@/middleware/mongoose";
import { Blog } from "@/models/Blog";
import { user } from "@/models/User";


const handler = async (req, res) => {
    const { query } = req;
    const filter = query.category.replace(/-/g," ");
    const Blogs = await Blog.find({category: filter}).populate("user").sort({ _id: -1 }).exec();
    res.status(200).json({ message: Blogs });
};


export default ConnectDb(handler);
