import AdminBlog from '@/components/AdminBlog/AdminBlog';
import AdminLayout from '@/layouts/AdminLayout';
import React, { useState, useEffect } from 'react';
import style from '@/styles/ManageBlogs.module.css';

const Blogs = (props) => {
  const [allBlogs, setAllBlogs] = useState(props.data.message); // Original blog data
  const [filteredBlogs, setFilteredBlogs] = useState(props.data.message); // Blogs after filtering
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [sortType, setSortType] = useState('latest'); // Default sorting option

  // Function to handle sorting
  const sortBlogs = (type, blogs) => {
    let sortedBlogs;
    switch (type) {
      case 'maxViews':
        sortedBlogs = [...blogs].sort((a, b) => b.views - a.views); // Sort by views (high to low)
        break;
      case 'latest':
        sortedBlogs = [...blogs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by latest (most recent)
        break;
      case 'oldest':
        sortedBlogs = [...blogs].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Sort by oldest (least recent)
        break;
      default:
        sortedBlogs = [...blogs];
    }
    return sortedBlogs;
  };

  // UseEffect to sort whenever sortType or searchQuery changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = allBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(lowercasedQuery)
    ); // Filter blogs based on search query

    const sortedFilteredBlogs = sortBlogs(sortType, filtered); // Sort filtered blogs
    setFilteredBlogs(sortedFilteredBlogs);
  }, [sortType, searchQuery, allBlogs]);

  return (
    <div className={style.root}>
      <div className={style.sortContainer}>
        <input
          className={style.inputSearch}
          type="text"
          placeholder="Search blog with name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
          className={style.sortSelect}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="maxViews">Max Views</option>
        </select>
      </div>

      <div className={style.blogsContainer}>
        {filteredBlogs?.length > 0 ? (
          filteredBlogs.map((value, index) => (
            <AdminBlog data={value} key={index} />
          ))
        ) : (
          <div className={style.noResults}>No blogs found</div>
        )}
      </div>
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

Blogs.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Blogs;
