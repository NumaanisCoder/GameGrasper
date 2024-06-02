import React, { useState } from 'react'
import style from '@/styles/searchPage.module.css'
import BlogCard from '@/components/BlogCard/BlogCard'

const search = () => {
  const [Blog, setBlog] = useState([]);
  const [Load, setLoad] = useState("");

  return (
    <div className={style.parent}>
      <div className={style.searchContainer}>
        <input
          placeholder="Search Certain Blogs with keywords"
          onChange={async (e) => {
            if (e.target.value.length >= 3) {
              setLoad("Loading..");
              const query = e.target.value;
              try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/getbytitle`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json", // Specify the content type as JSON
                  },
                  body: JSON.stringify({ query }), // Convert the body to a JSON string
                });

                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (data.message.length == 0){
                  setLoad("Sorry, No Matching Documents Found 💀")
                }
                setBlog(data.message);
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            } else {
              setLoad("");
              setBlog([]); // Reset Blog to an empty array if the search query is less than 3 characters
            }
          }}
          type="text"
          className={style.searchInput}
        />
      </div>

      <div className={style.blogContainer}>
        {Blog && Blog.length > 0 ? (
          Blog.map((Value, Index) => (
            <BlogCard key={Index} data={Value} />
          ))
        ) : (
          <h3 style={{color:'white'}}>{Load}</h3>
        )}
      </div>
    </div>
  );
};



export default search
