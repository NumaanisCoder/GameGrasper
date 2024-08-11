import BlogCard from "@/components/BlogCard/BlogCard";
import { useEffect, useState } from "react";
import style from "@/styles/tag.module.css"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";


function tag(props) {

    const [TagBlogs, setTagBlogs] = useState(props.data.blogs);
    const router  = useRouter();
    const tag = router.query.tag;
    const isDarkMode = useSelector(state => state.theme.isDarkMode);


    return (

        <div className={style.root} style={{backgroundColor: isDarkMode ? 'black' : 'white'}}>
            <h2  style={{color: isDarkMode ? 'white' : 'black'}}>:=<span>{tag}</span>=:</h2>
                   <div className={style.blogcontainer}>
            {TagBlogs && TagBlogs.map((value, index) => (
                <BlogCard data={value} key={index} />
            ))}
            </div>
        </div>

    )



}


export async function getServerSideProps(context) {
    const { query } = context;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag/${query.tag}`
    );
    const data = await res.json();

    return {
        props: {
            data,
        },
    };
}


export default tag;