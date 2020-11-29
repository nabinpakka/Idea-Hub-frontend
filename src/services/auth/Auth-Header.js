
function authHeader() {

    const jwt = localStorage.getItem("jwt")

    if(jwt){
        console.log(jwt)
        return {Authorization: "Bearer "+jwt}
    }else{
        return {}
    }
}

export default authHeader;
