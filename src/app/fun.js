import axios from "axios";
import { api } from "@/components/api/api";

async function content(params) {
  try{
    const response = await axios.post(`${api}/getpostdetails`, {
      params: params,
    });
  
    if (!response.data) {
      redirect("/");
    }
    return response.data;
  }catch(error){
    console.log('errror in getting technology post',error)
  }
  }

  export default content;