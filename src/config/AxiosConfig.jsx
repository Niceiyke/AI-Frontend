
import axios from "axios";

var baseURL=process.env.BASEURL

const AxiosInstance =axios.create({
    baseURL:baseURL,
    
})

export default AxiosInstance