import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '@/styles/Editor.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import { headers } from '@/next.config';
import AdminLayout from '@/layouts/AdminLayout';

const App = (props)=> {
  const editorRef = useRef(null);
  const router = useRouter();
  let formData = new FormData();

  

  const [formValues, setFormValues] = useState({
    title: props.data.blog.title,
    content: props.data.blog.content,
    summary: props.data.blog.summary,
    tags: props.data.blog.tags,
  });
  const [file, setFile] = useState(null);
  const [submitButton, setSubmitButton] = useState('Update');
  const [loading, setLoading] = useState(false); // For loading state
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  // Logging the editor content
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // Update form values
  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleImageUpload = (blobInfo) => {
    return new Promise((resolve,reject)=>{
      const formData = new FormData();
      formData.append("img", blobInfo.blob(), blobInfo.filename());

      const config = {
        headers:{
          'content-type': 'multipart/form-data'
        }
      };

      axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/uploadimg`, formData, {config, responseType: 'json'}).
      then((response)=>{
        if(response && response.data){
          const imageData = response.data;
          const imageUrl = imageData.imageurl;
          resolve(imageUrl)
        }
      })
      .catch((error)=>{
        reject("Image Upload Failed ",error)
      })
    })
  }

  // Handle form submission
  const formHandler = async (e) => {
    setSubmitButton("Updating...");
    e.preventDefault();
    formData.set("id", router.query.id);
    formData.set("title", formValues.title);
    formData.set("summary", formValues.summary);
    formData.set("content", formValues.content);
    formData.set("category", formValues.category);
    formData.set("image", file);
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/updateblog`,
      formData
    );
    const data = res.data;
    if (data.progress) {
      setSubmitButton("Updated");
      router.push("/admin/root");
    }
  };



  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <form className={styles.formContainer} onSubmit={formHandler}>
          <div className={`${styles.formGroup} `}>
            <label className={styles.formLabel} htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles.formGroup}`}>
            <label className={styles.formLabel} htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className={`${styles.formGroup}`}>
            <label className={styles.formLabel} htmlFor="content">Content</label>
            <Editor
              apiKey="jrxdph57q4mtysxvlm6944jhzld8wkacw7psmho9hxlfjown"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              value={formValues.content}
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'help', 'wordcount'
                ],
                toolbar: 'undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize | bold italic underline forecolor backcolor | link image | alignleft aligncenter alignright alignjustify | code',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                image_dimensions: false,
                images_upload_handler: handleImageUpload,
              }}
              onEditorChange={(content) => setFormValues({ ...formValues, content })}
            />
          </div>

          <div className={`${styles.formGroup} `}>
            <label className={styles.formLabel} htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              cols="30"
              rows="3"
              value={formValues.summary}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className={`${styles.formGroup} ${isDarkMode ? style.darkFG : ""}`}>
            <label className={styles.formLabel} htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formValues.tags}
              onChange={handleChange}
              required
            />
          </div>
         

          <div className={`${styles.formGroup} `}>
            <button className={styles.submitButton} type="submit" disabled={loading}>
              {loading ? 'Upadting...' : submitButton}
            </button>
          </div>
          <button className={styles.submitButton} type='button' onClick={log}>Log Editor Content</button>
        </form>
      </div>
    </div>
  );
}


App.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default App;



export async function getServerSideProps(context) {
  const { query } = context;
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/${query.id}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}