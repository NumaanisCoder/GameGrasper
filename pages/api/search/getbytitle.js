// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { user } from '@/models/User';

const handler = async (req, res) => {
    console.log(req.body.query);
    let regex = new RegExp(req.body.query, "i");
    const blog = await Blog.find({title: regex}).sort({_id: -1}).exec();
    res.status(200).json({ message: blog });
};


export default ConnectDb(handler);