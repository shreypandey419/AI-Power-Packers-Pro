import axios from "axios";

const API = "http://localhost:5001/api/uploads";

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