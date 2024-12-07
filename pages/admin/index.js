import MyChart from "@/components/MyChart";
import AdminLayout from "@/layouts/AdminLayout";
import style from '@/styles/AdminDashBoard.module.css'




const AdminDashboard = (props) => {
  return <div className={style.root}>

    <div className={style.topBlogsContainer}>
<MyChart blogs={props.data.topBlogs} label={"Top Blogs"} color={"#EC058E"}/>
<MyChart blogs={props.data.trending} type="bar" label={"Trending Blogs"} color={"#fa0000"}/>

    </div>


  </div>;
};

// Assign layout
AdminDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/blog`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}


export default AdminDashboard;
