import axios from "axios";
import { api } from "@/components/api/api";

async function content(params) {
    const response = await axios.post(`${api}/getpostdetails`, {
      params: params,
    });
  
    if (!response.data) {
      redirect("/");
    }
    return response.data;
  }

  export default content;