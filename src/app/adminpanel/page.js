"use client";
import Link from "next/link";
import TableOne from "@/components/Tables/TableOne";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import Footer from "@/components/Layout/Footer/Footer";
import FooterCopyright from "@/components/Layout/Footer/FooterCopyright";
import BreadCrumb from "@/components/Others/BreadCrumb";


const TablesPage = () => {

  return (
    <>
      <div className="home-1-bg">
        <DrawerHeader />

        <div className="post__gallery__area">
          <div className="container grid pt-8">
          <h3 className="title"><i>Admin Panel</i></h3>
          <div className=" h-auto p-2 flex shadow">
          <Link className="bg-orange-400 m-5 p-3 rounded-lg shadow" href="/adminpanel/AdminpostUpload">Create New Post</Link>
          <Link className="bg-orange-400 m-5 p-3 rounded-lg shadow" href="/">Manage User Question </Link>
          </div> 
            <div className="grid">
              <TableOne />
            </div>
          </div>
        </div>

        <Footer />
        <FooterCopyright />
      </div>
    </>
  );
};

export default TablesPage;
