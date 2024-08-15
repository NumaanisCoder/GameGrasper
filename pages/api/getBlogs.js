// Import NodeCache library
import NodeCache from "node-cache";
import ConnectDb from "@/middleware/mongoose";
import { Blog } from "@/models/Blog";
import { user } from "@/models/User";

// Initialize a new NodeCache instance
const cache = new NodeCache();

// Your Next.js API route
const handler = async (req, res) => {
  try {
    // Check if cached data is available
    const cachedData = cache.get("blogs");
    if (cachedData) {
      // If cached data is available, return it directly
      return res.status(200).json(cachedData);
    }

    // If cached data is not available, fetch from the database
    const allBlogs = await Blog.find({}).sort({ _id: -1 }).exec();

    const all = await Blog.find({}).sort({views: -1}).exec();
    const mostViewedBlog = all.slice(0,4);

    // Check if there are blogs available
    if (allBlogs.length === 0) {
      return res.status(404).json({ error: "No blogs found" });
    }

    // Separate the blogs into latest, next three, and the rest
    const latestBlog = allBlogs[0]; // The latest blog
    const nextThreeBlogs = allBlogs.slice(1, 4); // Next 3 latest blogs
    const restBlogs = allBlogs.slice(4, 14); // Remaining blogs

    // Cache the separated data with a TTL (time-to-live) of 30 minutes (1800 seconds)
    cache.set("blogs", { latestBlog, nextThreeBlogs, restBlogs, mostViewedBlog }, 60 * 2);

    // Return the separated data
    res.status(200).json({ latestBlog, nextThreeBlogs, restBlogs, mostViewedBlog });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Apply the middleware to your API route
export default ConnectDb(handler);
