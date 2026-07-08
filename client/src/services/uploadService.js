import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/uploads`;

export const uploadProfileImage = async(file)=>{

    console.log(API);

    const formData=new FormData();

    formData.append("image",file);

    const res=await axios.post(

        `${API}/profile-image`,

        formData,

        {

            headers:{

                Authorization:`Bearer ${localStorage.getItem("customerToken")}`

            }

        }

    );

    return res.data;

}