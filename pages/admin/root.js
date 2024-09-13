import React, { useEffect, useState } from "react";
import style from "@/styles/Admin.module.css";
import AdminBlog from "@/components/AdminBlog/AdminBlog";
import { useRouter } from "next/router";
import axios from "axios";
import ExcelButton from "@/components/Excel/ExcelDownloadButton";
import { useDispatch, useSelector } from "react-redux";
import { toggelTheme } from "@/store/themeSlice";
import Cookies from "js-cookie";
import getFilterOptions from "@/lib/FilterProvider";
import { useSnackbar } from "notistack";
import MyChart from "@/components/MyChart";
import Link from "next/link";



const Admin = (props) => {

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
   const getOptions = getFilterOptions();

  const dispatch = useDispatch();

  useEffect(() => {
    if(Cookies.get("tokenofrelaxbyte")){
        if(Cookies.get("tokenofrelaxbyte") !== process.env.NEXT_PUBLIC_ADMIN_TOKEN){
            router.push("/admin");
        }
    }else{
        router.push("/admin");
    }

    dispatch(toggelTheme())
    
  }, [])

  const [content, setContent] = useState("");

  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const [file, setfile] = useState(null);
  const [formValues, setformValues] = useState({
    title: "",
    content: "",
    summary: "",
    category: "",
    tags:""
  });
  const [SubmitButton, setSubmitButton] = useState("Post");
  const imageformValue = new FormData();
  const router = useRouter();
  const [imageurl, setimageurl] = useState("");
  const [label, setlabel] = useState("Copy");
  const [imageUploadButton, setimageUploadButton] = useState("Upload");
  let formData = new FormData();


  const handleChange = (e) => {
    const {value, name} = e.target;
    setformValues({...formValues,[name]:value})

    if(e.target.name == "content"){
      setContent(e.target.value);
    }
  }

  function countWords(inputString) {
    // Remove leading and trailing whitespaces

      let filter1 = inputString.replace(/<\/?[^>]+(>|$)/g, " ");
      let filter2 = filter1.replace(/&#39;/g, "'");
      let filter3 = filter2.replace(/&quot;/g, '"');
      let filter4 = filter3.replace(/\n/g, "");

  
    const trimmedString = filter4.trim();

    // Check for an empty string
    if (trimmedString === "") {
        return 0;
    }

    // Split the string into an array of words
    const wordsArray = trimmedString.split(/\s+/);

    if(wordsArray.length < 500){
      document.querySelector('#teller').style.color = 'red'
    }else{
      document.querySelector('#teller').style.color = 'green'
    }

    // Return the count of words
    return wordsArray.length;
}

  const handleCopyToClipboard = () => {
    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(imageurl)
      .then(() => {
        setlabel("Copied");
        enqueueSnackbar("Copied", {variant: "info"});
        setTimeout(() => {
          setlabel("Copy");
        }, 1000);
       
      })
      .catch((err) => {
        console.error('Unable to copy text to clipboard:', err);
      });
  };




  const formHandler = async (e) => {
    setSubmitButton("Posting...");
    e.preventDefault();
    formData.set("title", formValues.title);
    formData.set("summary", formValues.summary);
    formData.set("content", formValues.content);
    formData.set("image", file);
    formData.set("tags",formValues.tags)

    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/uploadblog`,formData);

    const data = res.data;
    if (data.progress) {
      enqueueSnackbar("Posted", {variant: "success"});
      setSubmitButton("Posted");
      router.reload();
    }
  };

  return (
    <div className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <div className={style.linkToEditor}>
      <Link href="/admin/editor">Upload Blog Via Editor</Link>
      </div>
      <details>
        <summary>Upload new Blog</summary>
        <form className={style.formContainer} onSubmit={formHandler}>
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={style.formLabel} htmlFor="">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
            />
          </div>
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={style.formLabel} htmlFor="">
              Image
            </label>
            <input
              type="file"
              name=""
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              required
            />
          </div>
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={style.formLabel} htmlFor="">
              Content
            </label>
            <textarea
              name="content"
              id=""
              cols="30"
              rows="8"
              onChange={handleChange}
              required
            ></textarea>
            <p className={style.wordcount}><span id="teller">{countWords(content)}</span>/500</p>
          </div>
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={style.formLabel} htmlFor="">
              Summary
            </label>
            <textarea
              name="summary"
              id=""
              cols="30"
              rows="3"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={style.formLabel} htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              onChange={handleChange}
              required
            />
          </div>
         
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <button className={style.submitButton}>{SubmitButton}</button>
          </div>
        </form>
      </details>

      <details className={style.div2}>
        <summary>Get Image URL</summary>
        <form className={style.formContainer}
          onSubmit={async (e) => {
            e.preventDefault();
            setimageUploadButton("Uploading..");
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/uploadimg`,imageformValue);
            setimageUploadButton("Uploaded");
            setTimeout(() => {
              setimageUploadButton("Upload");
            }, 1000);
            const data = res.data;
            setimageurl(data.imageurl);
        
          }}
        >
          <div className={style.formGroup2}>
            <label htmlFor="imagee" className={style.formLabel}>Upload Image Here</label>
            <input
              type="file"
              id="imagee"
              required
              onChange={(e) => {
                imageformValue.set("img", e.target.files[0]);
              }}
            />
          </div>
          <div className={`${style.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <button className={style.submitButton}>{imageUploadButton}</button>
          </div>
        </form>
        <div className={style.formGroup2}>
        <button  onClick={handleCopyToClipboard}  htmlFor="urll" className={style.submitButton2}>{label}</button>
        <input type="text" id="urll" className={style.urlimage} disabled  value={imageurl} />
        </div>
      </details>



      {/* this is all blog section */}
      <details className={style.div2}>
        <summary>View and customize all blogs</summary>
        <div className={style.allblogcontainer}>
          {props.data.message.map((value, index) => (
            <AdminBlog data={value} key={index} />
          ))}
        </div>
      </details>

      <details className={style.div2}>
        <summary>Download Today Report</summary>
            <ExcelButton/>
      </details>
      <details className={style.ChartDIV}>
        <summary>Top Blogs</summary>
        <MyChart blogs={props.data.topBlogs}/>
      </details>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/blog`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Admin;
