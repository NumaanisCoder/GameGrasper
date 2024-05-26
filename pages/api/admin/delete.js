// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { user } from '@/models/User';


const handler = async (req, res) => {
    const {postId} = req.body;
    await Blog.findByIdAndDelete(postId);
    res.status(200).json({
        message: "Deleted Successfully"
    })
};

export default ConnectDb(handler);
