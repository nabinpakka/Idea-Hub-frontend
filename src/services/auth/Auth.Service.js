import axios from '../axiosConfig';

const register =async  (username,password,role)=>{
    return axios.post("/auth/signup",{
        username,
        password,
        role
    }).then((response)=>{
        console.log(response.data.message)
        return response.data.message
    });
};

const login = async (username,password) =>{
    return axios.post("/auth/login",{
        username,
        password
    }).then((response)=>{
        let responseString = JSON.stringify(response)
        let responseJson = JSON.parse(responseString)
        let jwt = responseJson.data.message;
        console.log(jwt)
        if(jwt !== null){
            console.log("logged in :" +jwt)
            //storing the jwt token in local storage
            localStorage.setItem("jwt",jwt);
            return true
        }else{
            return false;
        }
    })
}

const logout = async ()=>{
    return axios.post("/auth/logout")
        .then((response)=>{
        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
        return true;
    }).catch((error)=>{
        console.log(error)
            return false;
    })
};

const getCurrentUser=async ()=>{
    return await axios.get("/auth/user").then((response)=>{
        console.log(response.data.role)
        return response.data.role
    }).catch((error)=>{
        console.log(error);
        return null;
    })
};

const getAuthors=async  ()=>{
    return axios.get(
        "/auth/authors")
        .then((response) =>{
            console.log(response.data)
            return response.data
    }).catch(e=>console.log(e))
};
export default {
    register,
    login,
    logout,
    getCurrentUser,
    getAuthors
};
