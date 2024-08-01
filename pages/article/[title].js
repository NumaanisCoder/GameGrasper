import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar";
import { useRouter } from "next/router";
import style from "@/styles/BlogPage.module.css";
import Head from "next/head";
import Sbc from "@/components/SBC/Sbc";
import getEmoji from "@/lib/Emoji";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ThemeButton from "@/components/ToggelTheme/ThemeButton";
import AdBanner from "@/components/AdBanner";
import SingleComment from "@/components/comment/SingleComment";
import Cookies from "js-cookie";
import axios from "axios";
import { useSnackbar } from "notistack";
import Tag from "@/components/tag/Tag";

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

  const [AllComments, setAllComments] = useState(comment)
  const [Comment, setComment] = useState({
    message: "",
    token: "",
    blogid: _id,
  });

  const emoji = getEmoji(category);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 750);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function formatDate(milliseconds) {
    const date = new Date(milliseconds);
    return date.toUTCString();
  }

  const encrypturl = title.replace(/-/g, "~");
  const urlpart = `${process.env.NEXT_PUBLIC_BASE_URL}/article/${encrypturl.replace(/ /g, "-")}`;

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
        <meta property="og:url" content={`https://www.gamegrasper.blog/article/${title.replace(/ /g, "-")}`} />
        <meta property="og:type" content="article" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={summary} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={image} />
        <meta name="twitter:card" content={summary} />
      </Head>

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

        {isMobile ? (
          <Image
            src={image}
            className={style.blogimage}
            width={400}
            height={200}
            alt={title}
            priority
          />
        ) : (
          <Image
            src={image}
            className={style.blogimage}
            width={700}
            height={500}
            alt={title}
            priority
          />
        )}

        <p
          className={style.content}
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>
        
        <div className={style.tagContainer}>
          {arrayoftags && <span>Tags:</span>} {arrayoftags && arrayoftags.map((value, index) => (
            <Tag text={value} key={index}/>
          ))}
        </div>

        <h3 className={style.commentSecTitle}>Comment Section </h3>
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
                className={style.commentTextArea}
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

                  if (Comment.message < 1) {
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
        <section className={style.suggestionparent}>
          <p className={`${style.sphead} ${isDarkMode ? style.darkSpHead : ""}`}>
            You Might Want to Read{" "}
          </p>
          <div className={style.rContainer}>
            {props.data.rem.map((value, index) => (
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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${query.title}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Blog;
