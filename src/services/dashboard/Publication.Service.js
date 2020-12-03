import axios from '../axiosConfig';
let PUB = "/publications/"

const getApprovedPublications=async ()=>{
    return await axios.get(PUB).then((response)=>{
        console.log(response.data)
        return response.data
    }).catch((error)=>{
        console.log(error)
    })
};

const getPublications=async (id)=>{
    return axios.get(PUB+id).then((response)=>{
        console.log(response.data)
        return response.data
    }).catch(e=>console.log(e))
}

const getMyPublications=async (role)=>{

    console.log(role)
    if(role ==="AUTHOR"){
        return axios.get(PUB+"author").then((response)=>{
            console.log(response.data)
            return response.data
        }).catch(e=>console.log(e))
    }
    else{
        return axios.get(PUB+"publicationHouse").then((response)=>{
            return response.data
        }).catch(e=>console.log(e))
    }

}

const getPublicationsToReview=async (role)=>{
    if(role==="AUTHOR"){
        return await axios.get(PUB+"review/author").then((response)=>{
            console.log(response.data)
            return response.data;
        }).catch(e=>console.log(e))
    }
    else{
        return await axios.get(PUB+"review/publicationHouse").then((response)=>{
            console.log(response.data)
            return response.data;
        }).catch(e=>console.log(e))
    }


}


const updateReview=async (id,isApproved)=>{
    return axios.put(PUB+"reviewScore/"+ id+"/"+isApproved).then((response)=>{
        console.log(response.data)
        return response.data;

    }).catch(e=>console.log(e))

}

const assignReviewers=async (publicationId, reviewers)=>{
    return await axios.put(PUB+"reviewer/"+ publicationId,reviewers).then((response)=>{
        console.log("assignReviewers"+ response.data)
    })
}

const uploadPublications=async(data)=>{
    return await axios.post(PUB,data,{
        header:{
            "Content-Type": "multipart/form-data"
        }
    }).then((response)=>{
        console.log("upload"+response)
        return response.data
    }).catch((error)=>{
        console.log(error)
        return error;
    })
}

export default {
    getApprovedPublications,
    getPublications,
    getMyPublications,
    getPublicationsToReview,
    updateReview,
    assignReviewers,
    uploadPublications
}
