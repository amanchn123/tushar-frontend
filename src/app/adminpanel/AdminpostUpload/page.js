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
import { imageurl } from "@/components/api/api";

export default function Page() {
  const imageUrl = imageurl;

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
  let [selectedELement, setSelectedElement] = React.useState([]);
  const [khali,setKhali]=React.useState()

  let [state, setState] = React.useState({
    heading: null,
    title: null,
    description: null,
    insideImage: null,
    featuredImage: null,
    category: null,
    subCategory: null,
    slug: null,
    paragraph: [],
    images: [],
    content: [],
    alt: [],
    subHeading: [],
    banner: null,
  });

  const haadlelement = async (e) => {
    const val = e.target.value;
    await setSelectedElement([...selectedELement, val]);
    setKhali("")
  };


  const token = getCookie("AdminDetails")?JSON.parse(getCookie("AdminDetails"))?.token:null;

  const uploadPost = async () => {
    if (
      !state.heading ||
      !state.title ||
      !state.description ||
      !state.slug ||
      !state.banner
    ) {
      alert("pls Select all fields")
      // setSelectAll(false);
    } else {
      try {
        let contentFinal = selectedELement;
        let newPara = await state.paragraph.filter((ele) => {
          return ele !== undefined;
        });

        let subHead = (await state.subHeading) && state.subHeading;
        
        let modifiedContentFinal = await contentFinal.map((ele, index) => {
          if (ele === "para") {
            let head = subHead.shift();
            let par = newPara.shift();
            let shiftpara = { head, par };
            return shiftpara;
          }
          return ele;
        });

        const formdata = new FormData();

        (await state.images) &&
          state.images.forEach((fil) => {
            formdata.append(`images`, fil);
          });


        await formdata.append("heading", state.heading);
        await formdata.append("description", state.description);
        await formdata.append("featuredImage", state.featuredImage);
        await formdata.append("category", state.category);
        await formdata.append("subCategory", state.subCategory);
        await formdata.append("slug", state.slug);
        await formdata.append("title", state.title);
        await formdata.append("banner", state.banner);
        await formdata.append("alt", JSON.stringify(state.alt));
        await formdata.append("final", JSON.stringify(modifiedContentFinal));


        const response = await axios.post(`${api}/createNewPost`, formdata, {
          headers: {
            authorization: token.toString(),
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data == "not allowed") {
          setAllowed(false);
        } else if (response.data.postSuccess) {
          alert("Post updated Successfully")
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

  const portsize = useMediaQuery("(max-width: 1000px)");
  return (
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
        noValidate
        autoComplete="off"
      >
        {!allowed ? (
          <Alert severity="error">You are not allowed Pls login Again</Alert>
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

        <Typography fontSize={25} marginLeft={1} marginBottom={5}>
          Add new Post Blog
        </Typography>

        <div>
          <TextField
            id="outlined-textarea"
            label="www.domain/bog/"
            placeholder="www.domain/blog/"
            multiline
            onChange={(e) => {
              let text = e.target.value;
              let chang = text.replace(/ /g, "-");
              setState({ ...state, slug: chang });
            }}
          />

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={state.category}
              onChange={(e) => setState({ ...state, category: e.target.value })}
              label="Age"
            >
              <MenuItem value="Politics">Politics</MenuItem>
              <MenuItem value="WorldNews">World News</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="technology">technology</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Subcategory
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={state.subCategory}
              onChange={(e) =>
                setState({ ...state, subCategory: e.target.value })
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
            maxRows={4}
            fullWidth
            onChange={(e) => setState({ ...state, heading: e.target.value })}
          />
          <TextField
            id="outlined-textarea"
            label="Blog title"
            placeholder="Blog title"
            multiline
            onChange={(e) => setState({ ...state, title: e.target.value })}
          />
          <TextField
            id="outlined-multiline-static"
            label="Blog Description"
            multiline
            rows={3}
            
            onChange={(e) =>
              setState({ ...state, description: e.target.value })
            }
          />
        </div>

        <div className="bg-orange-100 p-4">
          {selectedELement &&
            selectedELement.map((ele, index) => (
              <>
                {ele == "para" && (
                  <>
                    <TextField
                      id="outlined-textarea"
                      label={`Paragraph ${index + 1} Heading (optional)`}
                      placeholder={`Enter Paragraph ${index + 1} Heading`}
                      onChange={(e) => {
                        const updatedContent = [...state.subHeading]; // Create a copy of the existing content array
                        updatedContent[index] = e.target.value;
                        setState({ ...state, subHeading: updatedContent });
                      }}
                    />
                    <textarea
                      class="mt-10 resize rounded-md appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="exampleFormControlTextarea1"
                      rows="7"
                      placeholder={`Paragraph ${index + 1}`}
                      onChange={(e) => {
                        const updatedContent = [...state.paragraph]; // Create a copy of the existing content array
                        updatedContent[index] = e.target.value; // Update the specific index with the new value
                        setState({ ...state, paragraph: updatedContent }); // Update the state
                      }}
                    ></textarea>
                  </>
                )}

                {ele == "image" && (
                  <div className="flex flex-col items-center space-y-4 mt-10 mb-10">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      First add Alt then select Image
                    </label>
                    <Button
                      sx={{}}
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Image Item {index + 1}
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
                )}
                <div className="w-full h-0.5 bg-black mt-2"> </div>
              </>
            ))}
          {selectedELement.length !== 0 && (
            <Button
              sx={{ marginTop: "10px" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              select Banner Image of Blog
              <VisuallyHiddenInput
                type="file"
                onChange={(e) =>
                  setState({ ...state, banner: e.target.files[0] })
                }
              />
            </Button>
          )}
        </div>

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
              value={khali}
              onChange={haadlelement}
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {/* <option value="">None</option> */}
                <option >Select</option>
                <option  value="para">
                  Para
                </option>
                <option  value="image">
                  Image
                </option>
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
        {/* </form> */}
        <div style={{ display: "flex", justifyContent: portsize ? "" : "end" }}>
          <Button variant="contained" onClick={uploadPost} style={{backgroundColor:"orange"}}>
            Upload Post
          </Button>
        </div>
      </Box>
    </>
  );
}
