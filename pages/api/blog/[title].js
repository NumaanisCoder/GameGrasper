// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';
import { Comment } from '@/models/Comment';
import NodeCache from "node-cache";

// Initialize a new NodeCache instance
const cache = new NodeCache();

// Your Next.js API route
const handler = async (req, res) => {
    try {
        const { query } = req;
        const newTitle = query.title.replace(/-/g, " ");
        const newTitle2 = newTitle.replace(/~/, '-');

        // Check if the data is cached
        const cachedBlog = cache.get(newTitle2);

        if (cachedBlog) {
            // If cached data is available, return it directly
            const cachedRem = cache.get(`${newTitle2}_rem`);
            return res.status(200).json({ message: cachedBlog, rem: cachedRem });
        }

        // If data is not cached, fetch from the database
        const blog = await Blog.findOne({ title: newTitle2 }).populate('comment').sort({ _id: -1 }).exec();

        if (blog) {
            blog.views += 1;
         

            // Exclude the current blog from AllCategoryBlog
            const relatedBlogs = await Blog.find({title: { $ne: newTitle2 } }).sort({ _id: -1 }).exec();

            await blog.save();

            // Cache the fetched data with a TTL (time-to-live) of 5 hours (18000 seconds)
            cache.set(newTitle2, blog, 60 * 2);
            cache.set(`${newTitle2}_rem`, relatedBlogs.slice(0, 3), 60 * 2);

            // Return the fetched data
            res.status(200).json({ message: blog, rem: relatedBlogs.slice(0, 3) });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Apply the middleware to your API route
export default ConnectDb(handler);
