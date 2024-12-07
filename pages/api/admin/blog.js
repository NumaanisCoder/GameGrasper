// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';

const handler = async (req, res) => {
    try {
        // Fetch all blogs sorted by newest first
        const Blogs = await Blog.find({}).sort({ _id: -1 }).exec();

        // Fetch top blogs based on views
        const topBlogs = await Blog.find({}).sort({ views: -1 }).exec();
        const topSeven = topBlogs.slice(0, 6);

        // Fetch top 5 trending blogs (high views, low time)
        const trendingBlogs = await Blog.find({})
            .sort({ views: -1, createdAt: 1 }) // High views, low time
            .limit(5)
            .exec();

        // Return the data
        res.status(200).json({
            message: Blogs,
            topBlogs: topSeven,
            trending: trendingBlogs, // Added trending blogs
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export default ConnectDb(handler);
