import React,{useState} from 'react'
import style from '@/styles/Admin.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";

const id = (props) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
    let formData = new FormData();
    const router = useRouter();
    const [file, setfile] = useState(null);
    const [SubmitButton, setSubmitButton] = useState("Update");
    const [wordcontent, setContent] = useState("");
    const [formValues, setformValues] = useState({
        title: props.data.blog.title,
        content: props.data.blog.content,
        summary: props.data.blog.summary,
        tags: props.data.tags || ""
      });
      const handleChange = (e) => {
        const {value, name} = e.target;
        setformValues({...formValues,[name]:value})
    
        if(e.target.name == "content"){
          setContent(e.target.value);
        }
      }

      function countWords(inputString = content) {
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

    const formHandler = async (e) => {
        setSubmitButton("Updating...");
        e.preventDefault();
        formData.set("id",router.query.id);
        formData.set("title", formValues.title);
        formData.set("summary", formValues.summary);
        formData.set("content", formValues.content);
        formData.set("tags", formValues.tags);
        formData.set("image", file);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/updateblog`,formData);
        const data = res.data;
        if (data.progress) {
          setSubmitButton("Updated");
          router.push("/admin/root");
        }
      };
  return (
    <div className={`${style.root} ${isDarkMode ? style.dark : ""}`}>
      <form className={style.formContainer} onSubmit={formHandler}>
          <div className={style.formGroup}>
            <label className={style.formLabel} htmlFor="">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
              value={formValues.title}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.formLabel} htmlFor="">
              Image
            </label>
            <input
              type="file"
              name=""
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
            />
          </div>
          <div className={style.formGroup}>
            <label className={style.formLabel} htmlFor="">
              Content
            </label>
            <textarea
              name="content"
              id=""
              cols="30"
              rows="8"
              value={formValues.content}
              onChange={handleChange}
              required
            ></textarea>
            <p className={style.wordcount}><span id="teller">{countWords(wordcontent)}</span>/500</p>
          </div>
          <div className={style.formGroup}>
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
              value={formValues.summary}
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
              value={formValues.tags}
              required
            />
          </div>
         
          <div className={style.formGroup}>
            <button className={style.submitButton}>{SubmitButton}</button>
          </div>
        </form>
    </div>
  )
}

export async function getServerSideProps(context){
    const {query} = context;
     // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${query.id}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default id
