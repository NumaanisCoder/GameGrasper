// Import the middleware
import ConnectDb from '@/middleware/mongoose';
import { Blog } from '@/models/Blog';

export default ConnectDb(async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=3600');

  try {
    // Fetch all blog titles
    const blogs = await Blog.find({}, 'title').exec();

    // Generate dynamic sitemap
    const currentDate = new Date().toISOString();
    const baseUrl = 'https://www.relaxbyte.com';
    const urls = blogs.map(blog => ({
      loc: `${baseUrl}/blog/${encodeURIComponent(blog.title.replace(/ /g, '-'))}`,
      lastmod: currentDate,
      priority: 0.80,
    }));

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.9</priority>
        </url>
        <url>
          <loc>${baseUrl}/about-us</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/Video-Games</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/Anime</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/Technology</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/Programming</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        <url>
          <loc>${baseUrl}/News</loc>
          <lastmod>${currentDate}</lastmod>
          <priority>0.7</priority>
        </url>
        ${urls
          .map(
            ({ loc, lastmod, priority }) => `
              <url>
                <loc>${loc}</loc>
                <lastmod>${lastmod}</lastmod>
                <priority>${priority}</priority>
              </url>
            `
          )
          .join('')}
      </urlset>`;

    res.end(xml);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
