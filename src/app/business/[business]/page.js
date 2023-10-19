import AdWidgetTwo from "@/components/AdsWidget/AdWidgetTwo";
import CommentForm from "@/components/Comments/CommentForm";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import Footer from "@/components/Layout/Footer/Footer";
import NewsLetter from "@/components/Newsletter/NewsLetter";
import TrendingNewsWidget from "@/components/NewsWidgets/TrendNewsWidget";
import LatestNews from "@/components/Others/LatestNews";
import content from "../../fun";
import Image from "next/image";
import BreakingNews from "@/components/News/BreakingNews";
import { imageurl } from "@/components/api/api";


export async function generateMetadata({ params }) {
  let data = await content(params);
  let des = data.metadata;

  return {
    title: JSON.stringify(des.title),
    description: JSON.stringify(des.description),
  };
}

export default async function PostDetailsOne({ params }) {
  let Postdata = await content(params);
  let contentData = Postdata.content;

  let imagePath = imageurl;

  return (
    <>
      <div className="home-1-bg">
        <DrawerHeader />
        <BreakingNews />/
        <section className="post-layout-1-area pb-80">
          <div className="container">
            <div className="row">
              <div className="col-12">
              </div>
              <div className="col-lg-8 " style={{ marginTop: "-60px" }}>
                <div className="post-layout-top-content post-layout-top-content-3">
                  <div className="post-content ">
                    <h3 className="title">{Postdata.heading} </h3>
                    <div className="post-author">
                      <div className="author-info">
                        <div className="thumb">
                          <img src={`${imagePath}/${Postdata.banner}`} alt="" />
                        </div>
                        <h5 className="title">Subash Chandra</h5>
                        <ul>
                          <li>March 26, 2020</li>
                          <li>Updated 1:58 p.m. ET</li>
                        </ul>
                      </div>
                      <div className="author-social">
                        <ul>
                          <li>
                            <a href="#">
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-youtube"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fal fa-heart"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fal fa-bookmark"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fas fa-ellipsis-v"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="thumb">
                      <Image height={300} width={200} style={{height:"200px",width:"200px"}} src={`${imagePath}/${Postdata.banner}`} alt="" />
                    </div> */}
                  </div>
                  {contentData &&
                    contentData.map((ele, index) => {
                      return (
                        <div className="post-text mt-15" key={index}>
                          {ele.hasOwnProperty("par") ? (
                            <>
                              <h5 className="title">{ele.head}</h5>
                              <p>{ele.par}</p>
                            </>
                          ) : (
                            ""
                          )}
                          {ele.hasOwnProperty("img") && ele.img ? (
                            <div className=" pb-15 flex justify-center">
                              <Image
                                height={200}
                                width={200}
                                src={`${imagePath}/${ele.img.filename}`}
                                alt={`${ele.alt}`}
                              />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      );
                    })}

                  <div className="post-tags">
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fas fa-tag"></i> Tags
                        </a>
                      </li>
                      <li>
                        <a href="#">Health</a>
                      </li>
                      <li>
                        <a href="#">World</a>
                      </li>
                      <li>
                        <a href="#">Corona</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 " style={{ marginTop: "-60px" }}>
                <div className="post_gallery_sidebar ">
                  <TrendingNewsWidget />
                  <AdWidgetTwo />
                  <AdWidgetTwo />
                </div>
              </div>
              <div className="col-lg-12">
              <NewsLetter />
              </div>
              <div className="col-lg-12">
              <LatestNews />
              </div>
              <div className="col-lg-12">
              <CommentForm />
              </div>
            </div>
          </div>
          
        </section>
        
        <Footer />
      </div>
    </>
  );
}
