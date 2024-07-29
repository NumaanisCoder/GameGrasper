// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';

const handler = async (req, res) => {
    try {
        const { query } = req;

        console.log("Real tag is ", query);

        // Ensure the slug is safe and properly formatted for regex
        const regex = new RegExp(query.slug, 'i');  // 'i' for case insensitive search

        const blogs = await Blog.find({ tags: regex }).sort({ _id: -1 }).exec();;

        if (blogs.length > 0) {
            // Return the fetched data
            res.status(200).json({ blogs });
        } else {
            res.status(404).json({ message: 'Blogs not found' });
        }

    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Apply the middleware to your API route
export default ConnectDb(handler);
