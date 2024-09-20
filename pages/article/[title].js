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

import {Open_Sans} from 'next/font/google'

// Dynamically import components
const Sbc = dynamic(() => import("@/components/SBC/Sbc"));
const AdBanner = dynamic(() => import("@/components/AdBanner"));
const SingleComment = dynamic(() => import("@/components/comment/SingleComment"));
const Tag = dynamic(() => import("@/components/tag/Tag"));
const SocialShare = dynamic(() => import("@/components/SocialShare"));
const FollowUs = dynamic(() => import("@/components/FollowUs"));

const Open_Sans_Font = Open_Sans({ subsets: ['latin'] })

const Blog = (props) => {
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
  } = props.data.message;

  const [AllComments, setAllComments] = useState(comment);
  const [Comment, setComment] = useState({
    message: "",
    token: "",
    blogid: _id,
  });

  const emoji = getEmoji(category);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isMobile, setIsMobile] = useState(false);
  const [scroll, setScroll] = useState(0);

  const encrypturl = title.replace(/-/g, '~');
  const questionmark = encrypturl.replace(/\?/g, '$');
  const urlpart = `/article/${questionmark.replace(/ /g, '-')}`;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setScroll(scroll);
    };
       // Load Twitter script
       const script = document.createElement('script');
       script.src = 'https://platform.twitter.com/widgets.js';
       script.async = true;
       document.body.appendChild(script);

       return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("scroll", progressBarHandler);
        document.body.removeChild(script); // Clean up the script
      };

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    return date.toUTCString();
  }
  function getURL(){
    const encrypturl = title.replace(/-/g, '~');
    const questionmark = encrypturl.replace(/\?/g, '$');
    const urlpart = `/article/${questionmark.replace(/ /g, '-')}`;
    return urlpart;
  }

  const arrayoftags = tags && tags.split(',').map(tag => tag.trim());

  return (
    <article className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={urlpart} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={summary} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:url" content={`https://www.gamegrasper.blog${getURL}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={image} />
        <meta name="twitter:card" content={summary} />
      </Head>

      <div className={style.progressBarContainer}>
        <div className={style.progressBar} style={{ transform: `scale(${scroll}, 1)` }}></div>
      </div>

      <main className={`${style.parent} ${isDarkMode ? style.darkp : ""}`}>
        <div className={style.metaInfo}>
          <h1 className={style.title}>{title}</h1>
          <p className={style.metap}>
            Published:{" "}
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
          width={700}
          height={500}
          quality={65}
          loading="lazy"
        />

        <div className={style.socialMediaContainer}>
          <FaShare width={30} />
          <SocialShare url={`https://www.gamegrasper.blog${urlpart}`} title={title} />
        </div>

        <AdBanner data-ad-slot="5158369704" data-ad-format="auto" data-full-width-responsive="true" />
        

        <p
          className={`${style.content} ${isDarkMode ? style.darkContent : ""} ${Open_Sans_Font.className}`}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>

        <AdBanner data-ad-slot="5158369704" data-ad-format="auto" data-full-width-responsive="true" />

        <div className={style.tagContainer}>
          {arrayoftags && <span>Tags:</span>}{" "}
          {arrayoftags && arrayoftags.map((value, index) => <Tag text={value} key={index} />)}
        </div>

        <div className={style.socialMediaContainer}>
          Follow us on <FollowUs />
        </div>
        <AdBanner data-ad-slot="5158369704" data-ad-format="auto" data-full-width-responsive="true" />

        <h3 className={style.commentSecTitle}>Comment Section</h3>
        <section className={style.commentSection}>
          <div className={style.viewComments}>
            {AllComments && AllComments.map((data, index) => (
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
                value={Comment.message}
                id="comment"
                onChange={(e) => {
                  setComment({ ...Comment, message: e.target.value });
                }}
                className={`${style.commentTextArea} ${isDarkMode ? style.DcommentTextArea : ""}`}
                cols="20"
                rows="5"
                required
              ></textarea>
              <button
                onClick={async (e) => {
                  if (!token) {
                    localStorage.setItem("PreviousPath", urlpart);
                    router.push("/accounts/signup");
                  }

                  if (Comment.message.length < 1) {
                    return;
                  }
                  e.target.innerText = "Posting..";
                  const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/uploadcomment`,
                    Comment
                  );
                  enqueueSnackbar("Comment Added", { variant: "success" });
                  const data = res.data;
                  const username = data.username;

                  setAllComments([...AllComments, { username, message: Comment.message }]);
                  setComment({ ...Comment, message: "" });
                  e.target.innerText = "Post";
                }}
              >
                post
              </button>
            </form>
          </div>
        </section>
      </main>

  
      {props.data.rem.length > 0 && (
        <section className={`${style.suggestionparent} ${isDarkMode ? style.darksp : ""}`}>
          <p className={`${style.sphead} ${isDarkMode ? style.darkSpHead : ""}`}>Latest</p>
          <div className={style.rContainer}>
            {props.data.rem.map((value, index) => (
              <Sbc data={value} key={index} />
            ))}
          </div>
        </section>
      )}
      {!isMobile && (
        <>
    <AdBanner data-ad-slot="5158369704" data-ad-format="auto" data-full-width-responsive="true" />
    <AdBanner data-ad-slot="5158369704" data-ad-format="auto" data-full-width-responsive="true" />
    </>
      )}
    </article>
  );
};

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

  return {
    props: {
      data,
    },
  };
}

export default Blog;
