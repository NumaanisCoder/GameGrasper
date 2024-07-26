import NavBar from "@/components/NavBar/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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

const Blog = (props) => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const token = Cookies.get('token');
  const router = useRouter();

  const {
    _id,
    title,
    image,
    content,
    category,
    summary,
    views,
    user,
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
  const [isMobile, setisMobile] = useState(false);

  useEffect(() => {
   
    if (window.innerWidth < 750) {
      setisMobile(true);
    } else {
      setisMobile(false);
    }
  }, []);

  function random(milliseconds) {
    const date = new Date(milliseconds);
    const realDate = date.toUTCString();
    return realDate;
  }

  const encrypturl = title.replace(/-/g, "~");
  const urlpart = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/article/${encrypturl.replace(/ /g, "-")}`;

  return (
    <article className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={summary} />

        <link rel="canonical" href={urlpart} />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4131180580860903"
          crossorigin="anonymous"
        ></script>

        <meta property="og:title" content={title} />

        {/* <!-- Description --> */}
        <meta property="og:description" content={summary} />

        {/* <!-- Image --> */}
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:alt" content={title} />

        {/* <!-- URL --> */}
        <meta
          property="og:url"
          content={`https://www.gamegrasper.blog/article/${title.replace(/ /g, "-")}`}
        />

        {/* <!-- Type (website, article, etc.) --> */}
        <meta property="og:type" content="article" />

        {/* <!-- Title --> */}
        <meta name="twitter:title" content={title} />

        {/* <!-- Description --> */}
        <meta name="twitter:description" content={summary} />

        {/* <!-- Image --> */}
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={image} />

        {/* <!-- Card Type (summary, summary_large_image, etc.) --> */}
        <meta name="twitter:card" content={summary} />
      </Head>

    
      {/* Blog Content */}
      <main className={`${style.parent} ${isDarkMode ? style.darkp : ""}`}>
        <div className={style.metaInfo}>
          <h1 className={style.title}>{title}</h1>
        
          
          <p className={style.metap}>
            Published :{" "}
            <b
              className={`${style.author} ${
                isDarkMode ? style.darkAuthor : ""
              }`}
            >
              {random(createdAt)}
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
        {/* <AdBanner
          data-ad-slot="5032371185"
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> */}

        <h3>Comment Section </h3>
        <section className={style.commentSection}>
          <div className={style.viewComments}>
            {AllComments && AllComments.map((data) => <SingleComment data={data} />)}
          </div>

          <div className={style.uploadNewC}>
            <form
              className={style.formGroup}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label className={style.labelComment} htmlFor="comment"></label>
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
                    localStorage.setItem("PreviousPath",urlpart);
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
                  enqueueSnackbar("Comment Added",{variant:"success"})
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

      {/* Related Blogs */}
      {props.data.rem.length > 0 && (
        <section className={style.suggestionparent}>
          <p
            className={`${style.sphead} ${isDarkMode ? style.darkSpHead : ""}`}
          >
            You Might Want to Read{" "}
          </p>
          <div className={style.rContainer}>
            {props.data.rem.map((value, index) => (
              <Sbc data={value} key={index} />
            ))}
            {/* {!isMobile && (
              <>
                <AdBanner
                  data-ad-slot="5032371185"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
                <AdBanner
                  data-ad-slot="5032371185"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </>
            )} */}
          </div>
        </section>
      )}
    </article>
  );
};

export async function getServerSideProps(context) {
  // Fetch data from external API
  const { query } = context;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${query.title}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      data,
    },
  };
}

export default Blog;
