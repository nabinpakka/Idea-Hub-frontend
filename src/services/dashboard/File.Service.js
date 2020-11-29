import axios from '../axiosConfig';

const getFiles=(id)=>{
    return axios.get("/files/"+id).then((response)=>{
        return response.data
    }).catch((e)=>console.log(e))
}
export  default getFiles;
