// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { user } from '@/models/User';




const handler = async (req, res) => {
    const Blogs = await Blog.find({}).sort({_id: -1}).exec();
    const topBlogs = await Blog.find({}).sort({views: -1}).exec();
    const topSeven = topBlogs.slice(0,6);
    res.status(200).json({ message: Blogs, topBlogs: topSeven });
};

export default ConnectDb(handler);
