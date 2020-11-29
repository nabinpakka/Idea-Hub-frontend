import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import AuthService from '../../../services/auth/Auth.Service'
import logout from "../../../assets/Logout.png"

import './Navigation.css'
import Logo from "../../utilities/Logo";
import Home from "../pages/Home";
import Publications from "../pages/Publications";
import ToReview from "../pages/ToReview";
import ComposePublication from "../pages/ComposePublication";

function Navigation({ background,hoverBackground}) {

    const navLinks=[
        {
            text:'Home',
            path:'/dashboard/home',
        },

        {
            text:'Publications',
            path:'/dashboard/publications',
        },
        {
            text:'To Review',
            path:'/dashboard/toReview',
        },
        {
            text:"ComposePublication",
            path:"/dashboard/composePublication"
        }
    ]

    const [hoverIndex, setHoverIndex] = useState(-1);
    const [logoutHoverIndex, setLogoutHoverIndex] = useState(-1);
    const [role, setRole] = useState("");

    function handleLogout(){
        AuthService.logout().then((response)=>{
            window.location="/";
        })
    }

    useEffect(()=>{
        AuthService.getCurrentUser().then( (response)=>{
            setRole(response)
            console.log("navigation"+response)
        })
    },[])

    useEffect(()=>{
        //check if user is logged in
        //jwt token should be available if user is logged in or have not logged out
        let jwt = localStorage.getItem("jwt")
        if(jwt ===null){
            //redirecting to landing page
            window.location = "/"
        }
    })

    return (

        <Router>
            {
                role ? <div style={{display:'flex',flexDirection:'column'}}>
                    <nav className={"responsive-toolbar"}
                         style={background}>
                        <figure className={"logo-figure"} >
                            <Logo/>
                        </figure>
                        <ul className={"nav-bar-tabs"}>
                            {navLinks.map((link,index) =>
                                <li className={"nav-bar-list"}
                                    onMouseEnter={()=>setHoverIndex(index)}
                                    onMouseLeave={()=>setHoverIndex(-1)}
                                    style={{background:hoverIndex===index ? (hoverBackground || '#999') :""}}
                                >
                                    <Link to={link.path}
                                          className={"nav-bar-links"}
                                    >
                                        {link.text}
                                    </Link>

                                </li>
                            )}

                        </ul>
                        <div className={"logout-div"}>
                            <div style={{width:'100%'}}>
                                <img src={logout}
                                     onClick={handleLogout}
                                     className={"logout-icon"}
                                     onMouseEnter={()=> setLogoutHoverIndex(1)}
                                     onMouseLeave={()=> setLogoutHoverIndex(-1)}
                                     style={{height: logoutHoverIndex ===1 ? "28px":"",
                                         width: logoutHoverIndex ===1 ? "28px":""
                                     }}
                                />
                            </div>
                        </div>

                    </nav>

                    <div style={{width:"100%"}}>
                        <Switch>
                            <Route exact path={"/dashboard/home"}>
                                <Home/>
                            </Route>
                            <Route exact path={"/dashboard/publications"}>
                                <Publications role={role}/>
                            </Route>
                            <Route exact path={"/dashboard/toReview"}>
                                <ToReview role={role}/>
                            </Route>
                            <Route path={"/dashboard/composePublication"}>
                                <ComposePublication/>
                            </Route>
                        </Switch>
                    </div>
                </div> : ""
            }
        </Router>

    );
}

export default Navigation;
