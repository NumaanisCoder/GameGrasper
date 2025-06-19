import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import style from "@/styles/BlogPage.module.css";
import Head from "next/head";
import getEmoji from "@/lib/Emoji";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
import { FaShare } from "react-icons/fa";
import { Open_Sans } from 'next/font/google';
import PopupForm from "@/components/PopUpAd/PopUpAd";

const Sbc = dynamic(() => import("@/components/SBC/Sbc"));
const AdBanner = dynamic(() => import("@/components/AdBanner"));
const SingleComment = dynamic(() => import("@/components/comment/SingleComment"));
const Tag = dynamic(() => import("@/components/tag/Tag"));
const SocialShare = dynamic(() => import("@/components/SocialShare"));
const FollowUs = dynamic(() => import("@/components/FollowUs"));

const Open_Sans_Font = Open_Sans({ subsets: ['latin'] });

const Blog = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const token = Cookies.get('token');
  const router = useRouter();

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
  } = data.message;

  const [allComments, setAllComments] = useState(comment);
  const [commentData, setCommentData] = useState({ message: "", token: "", blogid: _id });

  const emoji = getEmoji(category);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isMobile, setIsMobile] = useState(false);

  const urlpart = `/blog/${encodeURIComponent(title.replace(/-/g, '~').replace(/\?/g, '$'))}`;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 750);

    handleResize();
    window.addEventListener("resize", handleResize);

    const progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      console.log(totalScroll / windowHeight);
    };

    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(script);
    };
  }, []);

  function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    return date.toUTCString();
  }

  const arrayoftags = tags.split(',').map(tag => tag.trim());

  return (
    <article className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <Head>
        <title>{title} - Must Read Blog</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://www.gamegrasper.online${urlpart}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.gamegrasper.online${urlpart}`} />
        <meta property="og:title" content={`${title} | Latest Trends`} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Exclusive`} />
        <meta name="twitter:description" content={summary} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "image": [image],
            "author": {
              "@type": "Person",
              "name": "Numaan Qureshi"
            },
            "publisher": {
              "@type": "Organization",
              "name": "GameGrasper",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.gamegrasper.online/GameGrasperLogo.png"
              }
            },
            "datePublished": createdAt,
            "description": summary,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.gamegrasper.online${urlpart}`
            }
          })
        }} />
      </Head>

      <main className={`${style.parent} ${isDarkMode ? style.darkp : ""}`}>
        <div className={style.metaInfo}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.metap}>
            Published:
            <b className={`${style.author} ${isDarkMode ? style.darkAuthor : ""}`}>
              {formatDate(createdAt)}
            </b>
          </p>
        </div>

        <Image
          src={image}
          className={style.blogimage}
          alt={title}
          layout="responsive"
          width={1200}
          height={800}
          quality={80}
          loading="lazy"
        />

        <div className={style.socialMediaContainer}>
          <FaShare width={30} />
          <SocialShare url={`https://www.gamegrasper.online${urlpart}`} title={title} />
        </div>

        <div
          className={`${style.content} ${isDarkMode ? style.darkContent : ""} ${Open_Sans_Font.className}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        <div className={style.tagContainer}>
          {arrayoftags.length > 0 && <span>Tags:</span>}
          {arrayoftags.map((value, index) => <Tag text={value} key={index} />)}
        </div>

        <div className={style.socialMediaContainer}>
          Follow us on <FollowUs />
        </div>

        <h3 className={style.commentSecTitle}>Comment Section</h3>
        <section className={style.commentSection} id="comments">
          <div className={style.viewComments}>
            {allComments.map((data, index) => (
              <SingleComment data={data} key={index} />
            ))}
          </div>

          <div className={style.uploadNewC}>
            <form
              className={style.formGroup}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <textarea
                name="comment"
                value={commentData.message}
                id="comment"
                onChange={(e) => setCommentData({ ...commentData, message: e.target.value })}
                className={`${style.commentTextArea} ${isDarkMode ? style.DcommentTextArea : ""}`}
                cols="20"
                rows="5"
                required
              ></textarea>
              <button
                onClick={async (e) => {
                  if (!token) {
                    Cookies.set("BlogPreviousPath", `${urlpart}#comments`);
                    router.push("/accounts/login");
                    return;
                  }
                  if (commentData.message.length < 1) {
                    return;
                  }
                  e.target.innerText = "Posting..";
                  const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/uploadcomment`,
                    commentData
                  );
                  enqueueSnackbar("Comment Added", { variant: "success" });
                  const { username } = res.data;
                  setAllComments([...allComments, { username, message: commentData.message }]);
                  setCommentData({ ...commentData, message: "" });
                  e.target.innerText = "Post";
                }}
              >
                Post
              </button>
            </form>
          </div>
        </section>
      </main>

      {data.rem.length > 0 && (
        <section className={`${style.suggestionparent} ${isDarkMode ? style.darksp : ""}`}>
          <p className={`${style.sphead} ${isDarkMode ? style.darkSpHead : ""}`}>Latest</p>
          <div className={style.rContainer}>
            {data.rem.map((value, index) => (
              <Sbc data={value} key={index} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${encodeURIComponent(query.title)}`,
    {
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable',
      }
    }
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Blog;