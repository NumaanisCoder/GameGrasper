import Head from 'next/head';

export const config = { amp: 'hybrid' }; // Use 'hybrid' if you want to support both AMP and non-AMP versions

function BlogAmpPage(props) {
  const {
    _id,
    title,
    image,
    content,
    category,
    summary,
    tags,
    createdAt,
    comment,
  } = props.data.message;

  const date = new Date(createdAt);

  // Convert content to AMP-compliant format if needed
  const ampContent = content.replace(/<img /g, '<amp-img ').replace(/<\/img>/g, '</amp-img>');

  return (
    <article>
      <Head>
        <title>{title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://www.gamegrasper.blog/article/${title.replace(/ /g, "-")}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={`https://www.gamegrasper.blog/article/${title.replace(/ /g, "-")}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <style amp-custom>
          {`
            body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333; /* Updated from red for better readability */
}

header {
margin-top: 65px;
  padding: 16px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;
}

h1 {
  font-size: 24px;
  margin: 0;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin: 0 0 16px 0;
}

amp-img {
  width: 100%; /* Ensures the image takes the full width of its container */
  height: auto; /* Maintains the aspect ratio of the image */
  display: block; /* Removes any unwanted space below the image */
  margin: 0 auto; /* Centers the image horizontally if its container is wider */
  aspect-ratio: 16/9;
  object-fit: contain;
}
amp-timeago {
  color: #888;
}

section {
  padding: 16px;
  margin: 0;
  background-color: #fff;
  border-top: 1px solid #ddd; /* Added border for separation between sections */
}
  section hr{
  margin-top: 15px;
  margin-bottom: 10px;
  }
  section{
  margin: 20px 10px;
  }

.comment {
  border-top: 1px solid #eee;
  padding: 8px 0;
}
          `}
        </style>
        <script async custom-element="amp-auto-ads"
        src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
</script>
      </Head>
      <amp-auto-ads type="adsense"
        data-ad-client="ca-pub-4131180580860903">
</amp-auto-ads>

      <header>
        <h1>{title}</h1>
        <p>Published: <b>{date.toUTCString()}</b></p>
      </header>

      <amp-img
        src={image}
        width="300"
        height="500"
        layout="responsive"
        alt={title}
      />

      <section>
        <p dangerouslySetInnerHTML={{ __html: ampContent }} />
      </section>

      <section>
        <amp-timeago
          width="0"
          height="15"
          datetime={date.toJSON()}
          layout="responsive"
        >
          .
        </amp-timeago>
      </section>

      <section>
        {/* Render comments if needed */}
        {props.data.message.comment.map((data, index) => (
          <div key={index}>
            <p>{data.username}: {data.message}</p>
          </div>
        ))}
      </section>
    </article>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${query.title}`,
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable',
      }
    }
  );
  const data = await res.json();
  console.log("The data is", data)

  return {
    props: {
      data,
    },
  };
}

export default BlogAmpPage;
