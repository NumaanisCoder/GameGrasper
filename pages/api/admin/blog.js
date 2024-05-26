// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { user } from '@/models/User';




const handler = async (req, res) => {
    const Blogs = await Blog.find({}).populate("user").sort({_id: -1}).exec();
    res.status(200).json({ message: Blogs });
};

export default ConnectDb(handler);
