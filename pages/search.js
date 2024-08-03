import React, { useState, useCallback } from 'react';
import style from '@/styles/searchPage.module.css';
import BlogCard from '@/components/BlogCard/BlogCard';
import { useSelector } from 'react-redux';

const search = () => {
  const [Blog, setBlog] = useState([]);
  const [Load, setLoad] = useState("");
  const isDarkMode = useSelector(state => state.theme.isDarkMode);


  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };


  const handleSearchChange = async (e) => {
    if (e.target.value.length >= 3) {
      setLoad("Loading..");
      const query = e.target.value;
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/getbytitle`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.message.length === 0) {
          setLoad("Sorry, No Matching Documents Found 💀");
        } else {
          setLoad("");
        }
        setBlog(data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoad("An error occurred. Please try again later.");
      }
    } else {
      setLoad("");
      setBlog([]); // Reset Blog to an empty array if the search query is less than 3 characters
    }
  };

  // Use useCallback to memoize the debounced function
  const debouncedSearchChange = useCallback(debounce(handleSearchChange, 300), []);

  return (
    <div className={`${style.parent} ${isDarkMode ? style.darkParent : ""}`}>
      <div className={`${style.searchContainer} `}>
        <input
          placeholder="Search Certain Blogs with keywords"
          onChange={debouncedSearchChange}
          type="text"
          className={`${style.searchInput} ${isDarkMode ? style.darkSearchInput : ""}`}
        />
      </div>

      <div className={style.blogContainer}>
        {Blog && Blog.length > 0 ? (
          Blog.map((Value, Index) => (
            <BlogCard key={Index} data={Value} />
          ))
        ) : (
          <h3 style={{ color: 'RED' }}>{Load}</h3>
        )}
      </div>
    </div>
  );
};

export default search;
