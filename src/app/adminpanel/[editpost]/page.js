"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DrawerHeader from "@/components/Drawer&HeaderCom/drawerheaderclient";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { api } from "@/components/api/api";
import { getCookie } from "cookies-next";
import MuiAlert from "@mui/material/Alert";
import DeleteIcon from "@mui/icons-material/Delete";
import { imageurl } from "@/components/api/api";
import JoditEditor from "jodit-react";

export default function Page({ params }) {
  const getPostDet = async () => {
    try {
      const response = await axios.get(`${api}/getpost?id=${params.editpost}`);

      if (response.data) {
        setPostInfo(response?.data);
        setSelectedElement(response?.data);
        setMount(true);
      }
    } catch (error) {
      console.log("error in getting post in edit post in frontend", error);
    }
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return (
      <MuiAlert
        onDurationChange={4}
        elevation={6}
        ref={ref}
        variant="filled"
        {...props}
      />
    );
  });

  const [successPost, setSuccessPost] = React.useState();
  const [unsuccessPost, setUnsuccessPost] = React.useState(true);
  const [allowed, setAllowed] = React.useState(true);
  const [selectAll, setSelectAll] = React.useState(true);
  const [mount, setMount] = React.useState(false);
  let [selectedELement, setSelectedElement] = React.useState([]);
  const [postInfo, setPostInfo] = React.useState([]);
  const [khali, setKhali] = React.useState();

  const contentFinal = selectedELement;
  const imageUrls = imageurl;

  const token =
    getCookie("AdminDetails") && JSON.parse(getCookie("AdminDetails"))?.token;

  React.useEffect(() => {
    getPostDet();
  }, []);

  const [state, setState] = React.useState({
    heading: postInfo.heading,
    title: null,
    description: null,
    insideImage: null,
    featuredImage: null,
    category: postInfo?.category,
    subCategory: null,
    slug: null,
    paragraph: [],
    images: [],
    content: [],
    alt: [],
    updatedimage: [],
    subHeading: [],
    banner: null,
  });

  const uploadPost = async () => {
    if (!postInfo.slug) {
      setSelectAll(false);
    } else {
      try {
        // let contentFinal = selectedELement;
        let newPara = await state.paragraph?.filter((ele) => {
          return ele !== undefined;
        });

        let subHead =
          (await state.subHeading) &&
          state.subHeading.filter((ele) => {
            return ele !== undefined;
          });

        let modifiedContentFinal = await postInfo?.content.map((ele, index) => {
          if (ele === "para") {
            let head = subHead.shift();
            let par = newPara.shift();
            let shiftpara = { head, par };
            return shiftpara;
          }
          return ele;
        });

        const formdata = new FormData();

        (await state.updatedimage) &&
          state.updatedimage.forEach((fil, index) => {
            formdata.append(`updatedimage`, fil);
          });

        (await state.images) &&
          state.images.forEach((fil, index) => {
            formdata.append(`images`, fil);
          });

        await formdata.append("heading", postInfo.heading);
        await formdata.append("id", params.editpost);
        await formdata.append("description", postInfo?.metadata?.description);
        await formdata.append("featuredImage", postInfo.featuredImage);
        await formdata.append("category", postInfo.category);
        await formdata.append("subCategory", postInfo.subCategory);
        await formdata.append("slug", postInfo.slug);
        await formdata.append("title", postInfo?.metadata?.title);
        await formdata.append("banner", state.banner);
        await formdata.append("alt", JSON.stringify(state.alt));
        await formdata.append("final", JSON.stringify(modifiedContentFinal));

        const response = await axios.post(`${api}/updatepost`, formdata, {
          headers: {
            authorization: token.toString(),
            "Content-Type": "multipart/form-data",
          },
        });

        await formdata.delete("final");
        if (response.data == "not allowed") {
          alert("You are not allowed Pls login again");
        } else if (response.data.postUpdated) {
          alert("Post updated Successfully");
          setSuccessPost(true);
        }
      } catch (error) {
        console.log("error in upload post frontend", error);
      }
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const cont = postInfo?.content;

  const handlelement = async (e, index) => {
    const val = e.target.value;
    const updatedContent = [...postInfo.content]; // Create a copy of the content array
    updatedContent.splice(index, 0, val); // Modify the copy
    setPostInfo({ ...postInfo, content: updatedContent });
    setKhali(""); // Update the state
  };

  const handlremovelement = async (index) => {
    const updatedContent = [...postInfo.content]; // Create a copy of the content array
    updatedContent.splice(index, 1); // Modify the copy

    setPostInfo({ ...postInfo, content: updatedContent }); // Update the state
  };

  const portsize = useMediaQuery("(max-width: 1000px)");

  const editor = React.useRef(null);

  return (
    <>
      {mount ? (
        <>
          <DrawerHeader />

          <Box
            component="form"
            sx={{
          "& .MuiTextField-root": { m: 3, width: "35ch" },
          display: "grid",
          justifyContent: "center",
          padding: "10px",
        }}
            // sx={{
            //   "& .MuiTextField-root": {
            //     m: 3,
            //     width: portsize ? "30ch" : "35ch",
            //   },
            //   display: "grid",
            //   justifyContent: "center",
            //   padding: "10px",
            // }}
            noValidate
            autoComplete="off"
          >
            {!allowed ? (
              <Alert severity="error">
                You are not allowed Pls login Again
              </Alert>
            ) : (
              ""
            )}
            {successPost ? (
              <Alert severity="success">SuccessFully created New Post </Alert>
            ) : (
              ""
            )}
            {!unsuccessPost ? (
              <Alert severity="error">
                Error in creating Post Pls try again later{" "}
              </Alert>
            ) : (
              ""
            )}
            {!selectAll ? (
              <Alert severity="error">Pls select all fields </Alert>
            ) : (
              ""
            )}

            <Typography fontSize={25} padding={2} marginLeft={1}>
              Add new Post Blog
            </Typography>

            <div>
              <TextField
                id="outlined-textarea"
                label="www.domain/bog/"
                placeholder="www.domain/blog/"
                multiline
                defaultValue={`${postInfo.slug}`}
                onChange={(e) => {
                  let text = e.target.value;
                  let chang = text.replace(/ /g, "-");
                  setPostInfo({ ...postInfo, slug: chang });
                }}
              />

              <FormControl
                variant="standard"
                sx={{ m: 1, minWidth: 120, marginLeft: "25px" }}
              >
                <InputLabel id="demo-simple-select-standard-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={state.category}
                  defaultValue={postInfo.category}
                  onChange={(e) => {
                    setPostInfo({ ...postInfo, category: e.target.value });
                  }}
                  label="category"
                >
                  <MenuItem value="Politics">Politics</MenuItem>
                  <MenuItem value="WorldNews">World News</MenuItem>
                  <MenuItem value="sports">Sports</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="business">Business</MenuItem>
                  <MenuItem value="technology">technology</MenuItem>
                  <MenuItem value="entertainment">Entertainment</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Subcategory
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  defaultValue={postInfo.subCategory}
                  onChange={(e) =>
                    setPostInfo({ ...postInfo, subCategory: e.target.value })
                  }
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Breaking News">Breaking News</MenuItem>
                  <MenuItem value="Trending News">Trending News</MenuItem>
                  <MenuItem value="Featured News">Featured News</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Blog Heading"
                multiline
                defaultValue={postInfo.heading}
                maxRows={4}
                fullWidth
                onChange={(e) =>
                  setPostInfo({ ...postInfo, heading: e.target.value })
                }
              />
              <TextField
                id="outlined-textarea"
                label="Blog title"
                placeholder="Blog title"
                multiline
                defaultValue={postInfo?.metadata?.title}
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    metadata: { ...postInfo.metadata, title: e.target.value },
                  })
                }
              />
              <TextField
                id="outlined-multiline-static"
                label="Blog Description"
                multiline
                defaultValue={postInfo?.metadata?.description}
                rows={3}
                onChange={(e) =>
                  setPostInfo({
                    ...postInfo,
                    metadata: {
                      ...postInfo.metadata,
                      description: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div className="bg-orange-100 p-4">
              {postInfo?.content &&
                postInfo?.content.map((ele, index) => (
                  <div key={index}>
                    {ele?.hasOwnProperty("par") && (
                      <>
                        
                        <div className="flex justify-end p-2">
                          <DeleteIcon
                            onClick={() => handlremovelement(index)}
                            style={{ cursor: "pointer" }}
                          />{" "}
                        </div>

                        <TextField
                          id="outlined-textarea"
                          label={`Paragraph ${index + 1} Heading (optional)`}
                          placeholder={`Enter Paragraph ${index + 1} Heading`}
                          defaultValue={ele.head}
                          onChange={(e) => {
                            const updatedContent = [...postInfo.content]; // Create a copy of the existing content array
                            updatedContent[index].head = e.target.value;
                            setPostInfo({
                              ...postInfo,
                              content: updatedContent,
                            });
                          }}
                        />

                        <div style={{width:portsize?"90vw": "70vw"}}>
                        <JoditEditor
                          ref={editor}
                          value={ele.par}
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            const updatedContent = [...postInfo.content]; // Create a copy of the existing content array
                            updatedContent[index].par = newContent;
                            setPostInfo({
                              ...postInfo,
                              content: updatedContent,
                            });
                          }}
                        />
                        </div>

                        {/* <div
                          contentEditable="true"
                          className="mt-10 resize rounded-md appearance-none block  bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          style={{
                            border: "1px solid #ccc",
                            // minHeight: "30px",
                            // padding: "5px",
                            width: "40%",
                          }}
                          ref={textInput}
                          dangerouslySetInnerHTML={createMarkup(ele.par)}
                          // onInput={handleInput}
                          // dangerouslySetInnerHTML={{ __html: ele.par }}
                        ></div> */}
                      </>
                    )}
                    {ele == "para" && (
                      <>
                        <div className="flex justify-end p-2">
                          <DeleteIcon
                            onClick={() => handlremovelement(index)}
                            style={{ cursor: "pointer" }}
                          />{" "}
                        </div>
               
                        <TextField
                          id="outlined-textarea"
                          label={`Paragraph ${index + 1} Heading (optional)`}
                          placeholder={`Enter Paragraph ${index + 1} Heading`}
                          defaultValue={ele.head}
                          onChange={(e) => {
                            const updatedContent = [...state.subHeading]; // Create a copy of the existing content array
                            updatedContent[index] = e.target.value;
                            setState({ ...state, subHeading: updatedContent });
                          }}
                        />
                        <JoditEditor
                          ref={editor}
                          
                          // config={config}
                          tabIndex={1} // tabIndex of textarea
                          // preferred to use only this option to update the content for performance reasons
                          onChange={(newContent) => {
                            const updatedContent = [...state.paragraph]; // Create a copy of the existing content array
                            updatedContent[index] = newContent;
                            setState({
                              ...state,
                              paragraph: updatedContent,
                            });
                          }}
                        />
                      </>
                    )}
                    {ele?.hasOwnProperty("img") && (
                      <>
                        <div className="flex justify-end p-2">
                          <DeleteIcon
                            onClick={() => handlremovelement(index)}
                            style={{ cursor: "pointer" }}
                          />{" "}
                        </div>
                        <div className="flex flex-col items-center space-y-4 mt-10 mb-10">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            First add Alt then select Image
                          </label>
                          <img
                            style={{ height: "200px" }}
                            src={`${imageUrls}/${ele.img?.filename}`}
                          />
                          <Button
                            sx={{ backgroundColor: "#ffa31a", color: "white" }}
                            component="label"
                            // variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            change image {index + 1}
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) => {
                                const updatedContent = [...state.images]; // Create a copy of the existing content array
                                const originalFile = e.target.files[0]; // Get the original File object
                                const updatedName = ele.img?.filename; // New name

                                const updatedFile = new File(
                                  [originalFile],
                                  updatedName,
                                  { type: originalFile.type }
                                );

                                updatedContent[index] = updatedFile;
                                setState({
                                  ...state,
                                  updatedimage: updatedContent,
                                }); // Update the state
                              }}
                            />
                          </Button>
                          <TextField
                            // id="outlined-textarea"
                            label="Enter the Image alt"
                            placeholder="Image alt makes SEO friendly Blog"
                            multiline
                            defaultValue={ele.alt}
                            onChange={(e) => {
                              const updated = [...state.alt];
                              updated[index] = e.target.value;
                              setState({ ...state, alt: updated });
                            }}
                          />
                        </div>
                      </>
                    )}
                    {ele == "image" && (
                      <>
                        <div className="flex justify-end p-2">
                          <DeleteIcon
                            onClick={() => handlremovelement(index)}
                            style={{ cursor: "pointer" }}
                          />{" "}
                        </div>
                        <div className="flex flex-col items-center space-y-4 mt-10 mb-10">
                          <label
                            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="grid-state"
                          >
                            First add Alt then select Image
                          </label>
                          <Button
                            sx={{ backgroundColor: "#ffa31a", color: "white" }}
                            component="label"
                            // variant="contained"
                            startIcon={<CloudUploadIcon />}
                          >
                            select Image Item {index + 1}
                            <VisuallyHiddenInput
                              type="file"
                              onChange={(e) => {
                                const updatedContent = [...state.images]; // Create a copy of the existing content array
                                updatedContent[index] = e.target.files[0];
                                setState({ ...state, images: updatedContent }); // Update the state
                              }}
                            />
                          </Button>
                          <TextField
                            // id="outlined-textarea"
                            label="Enter the Image alt"
                            placeholder="Image alt makes SEO friendly Blog"
                            multiline
                            onChange={(e) => {
                              const updated = [...state.alt];
                              updated[index] = e.target.value;
                              setState({ ...state, alt: updated });
                            }}
                          />
                        </div>
                      </>
                    )}
                    <div class="flex flex-wrap -mx-3 mb-2 mt-20">
                      <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                          for="grid-state"
                        >
                          Add a New field
                        </label>
                        <div class="relative">
                          <select
                            onChange={(e) => handlelement(e, index + 1)}
                            value={khali}
                            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state"
                          >
                            <option>select field</option>
                            <option value="para">Para</option>
                            <option value="image">Image</option>
                          </select>

                          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg
                              class="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-black mt-2"> </div>
                  </div>
                ))}
              {selectedELement.length !== 0 && (
                <Button
                  component="label"
                  sx={{
                    backgroundColor: "#ffa31a",
                    color: "white",
                    margin: "5px",
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Change Banner Image of Blog
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                      const originalFile = e.target.files[0]; // Get the original File object
                      const updatedName = postInfo?.banner;

                      const updatedFile = new File(
                        [originalFile],
                        updatedName,
                        { type: originalFile.type }
                      );

                      setState({
                        ...state,
                        banner: updatedFile,
                      });
                    }}
                  />
                </Button>
              )}
            </div>

            {/* </form> */}
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "4px",
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#fb923c", color: "white" }}
                onClick={uploadPost}
              >
                Upload Post
              </Button>
            </div>
          </Box>
        </>
      ) : (
        ""
      )}
    </>
  );
}
