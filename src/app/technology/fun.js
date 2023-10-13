async function Content(params) {
    const response = await axios.post(`${api}/getpostdetails`, {
      params: params,
    });
  
    if (!response.data) {
      redirect("/");
    }
    return response.data;
  }

  export default Content;