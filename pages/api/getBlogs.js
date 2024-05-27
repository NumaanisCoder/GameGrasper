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
      return res.status(200).json({ message: cachedData });
    }

    // If cached data is not available, fetch from the database
    const Blogs = await Blog.find({}).sort({ _id: -1 }).exec();

    // Cache the fetched data with a TTL (time-to-live) of 1 hour (3600 seconds)
    cache.set("blogs", Blogs, 60*30);

    // Return the fetched data
    res.status(200).json({ message: Blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Apply the middleware to your API route
export default ConnectDb(handler);
