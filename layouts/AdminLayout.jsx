import NavBar from "@/components/NavBar/NavBar";
import SideMenu from "@/components/SideMenu/SideMenu";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);  // to manage loading state

  useEffect(() => {
    // Ensure that the check is done after the first render (on client-side)
    const token = Cookies.get("tokenofrelaxbyte");
    if (token) {
      if (token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
        router.push("/admin/login");  // redirect if token doesn't match
      } else { 
        setIsLoading(false); // token is valid, so stop the loading state
      }
    } else {
      router.push("/admin/login");  // redirect if no token exists
    }
  }, [router]); // Ensure that effect runs only once on mount

  if (isLoading) {
    return <div>Loading...</div>;  // Show loading until token is checked
  }

  return (
    <>
      <NavBar />
      <div style={{ display: "flex"}}>
        <SideMenu />
        <div className="content" style={{ flex: 1, padding: "0 10px", backgroundColor: "black", marginTop:"60px" }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
