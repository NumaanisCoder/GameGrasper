// pages/api/upload.js
import uploadImage from "@/lib/imagekit";
import ConnectDb from "@/middleware/mongoose";
import multer from "multer";


const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory as buffers
});

export const config = {
  api: {
    bodyParser: false,
  },
};

ConnectDb(); // Call the ConnectDb middleware

export default async function handler(req, res) {
  try {
    // Establish database connection using ConnectDb middleware

    if (req.method === "POST") {
      upload.single("img")(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ message: "File upload error." });
        } else if (err) {
          return res.status(500).json({ message: "Internal server error." });
        }
        console.log(req.file);

        const imagefile = req.file;

        const image = await uploadImage(
          imagefile.buffer,
          imagefile.originalname
        );

         
        return res
          .status(200)
          .json({ message: "Image Uploaded Successfully", imageurl:image});
      });
    } else {
      return res.status(405).json({ message: "Method not allowed." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
