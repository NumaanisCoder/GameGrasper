import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styles from '@/styles/Editor.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router';
import { headers } from '@/next.config';
import AdminLayout from '@/layouts/AdminLayout';


const CreateBlogPage = () => {
  const editorRef = useRef(null);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    title: '',
    content: '',
    summary: '',
    tags:''
  });
  const [file, setFile] = useState(null);
  const [submitButton, setSubmitButton] = useState('Post');
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
    e.preventDefault();
    setSubmitButton('Posting...');
    setLoading(true);

    let formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('summary', formValues.summary);
    formData.append('content', editorRef.current ? editorRef.current.getContent() : formValues.content);
    formData.append('tags', formValues.tags);
    formData.append('image', file);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/uploadblog`, formData);
      const data = res.data;
      if (data.progress) {
        setSubmitButton('Posted');
        router.reload(); // Reload page after successful post
      }
    } catch (err) {
      console.error('Error posting the form:', err);
      setSubmitButton('Post');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.root}>
      <div className={styles.form}>
        <form className={styles.formContainer} onSubmit={formHandler}>
          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ''}`}>
            <label className={styles.formLabel} htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ''}`}>
            <label className={styles.formLabel} htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>

          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ''}`}>
            <label className={styles.formLabel} htmlFor="content">Content</label>
            <Editor
              apiKey="jrxdph57q4mtysxvlm6944jhzld8wkacw7psmho9hxlfjown"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
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
                images_upload_handler: handleImageUpload    
              }}
              onEditorChange={(content) => setFormValues({ ...formValues, content })}
            />
          </div>

          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ''}`}>
            <label className={styles.formLabel} htmlFor="summary">Summary</label>
            <textarea
              name="summary"
              cols="30"
              rows="3"
              style={{padding: 6}}
              value={formValues.summary}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ""}`}>
            <label className={styles.formLabel} htmlFor="tags">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              onChange={handleChange}
              required
            />
          </div>

          <div className={`${styles.formGroup} ${isDarkMode ? styles.darkFG : ''}`}>
            <button className={styles.submitButton} type="submit" disabled={loading}>
              {loading ? 'Posting...' : submitButton}
            </button>
          </div>
          <button className={styles.submitButton} type='button' onClick={log}>Log Editor Content</button>
        </form>
      </div>
    </div>
  );
}


// Assign layout
CreateBlogPage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CreateBlogPage;
