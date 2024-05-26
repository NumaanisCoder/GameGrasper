// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { user } from '@/models/User';
import { useRouter } from 'next/router';



// Your Next.js API route
const handler = async (req, res) => {
    // Your API route logic here
    const { query } = req;
    const blog = await Blog.findById(query.id);
    res.status(200).json({
        message:"OK",
        blog: blog
    })
    
   
};

// Apply the middleware to your API route
export default ConnectDb(handler);