import React from "react";
import style from "./AdminBlogStyle.module.css";
import { useRouter } from 'next/router';
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({weight:['500'], subsets:['latin']});

const AdminBlog = ({ data }) => {
  const router = useRouter();
  const handleReload = () => {
    // Reload the current page
    router.reload();
  };

  return (

      <details className={`${style.root} ${poppins.className}`}>
        <summary className={`${style.summary} ${poppins.className}`}>{data.title} | <b>{data.views}</b></summary>
        <div className={style.actionButtonContainer}>
        <button
  className={style.deleteButton}
  onClick={async (e) => {
   const userconfirm = window.confirm("Are u really sure?");
   if(userconfirm){
    try {
      // Send the delete request
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: data._id }),
      });
      e.target.innerText = "Bye :(";
      handleReload();

      // If the deletion is successful, you can set the text to "Deleted"
    } catch (error) {
      console.error("Error deleting blog post:", error);
      // If there's an error, you might want to handle it accordingly
      e.target.innerText = "Delete"; // Reset the button text
      e.target.disabled = false; // Re-enable the button
    }}
  }}
>
  Delete
</button>

          <Link className={style.viewButton} href
          ={`/article/${data.title.replace(/ /g,'-')}`}>View</Link>
          <Link className={style.editButton} href={
            `/admin/editblog/${data._id}`
          }>Edit</Link>
        </div>
      </details>

  );
};

export default AdminBlog;
