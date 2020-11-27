import React, {useState} from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";

import logout from "../../../assets/Logout.png"

import './Navigation.css'
import Logo from "../../utilities/Logo";
import Home from "../pages/Home";
import Publications from "../pages/Publications";
import MyPublications from "../pages/MyPublications";
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
            text:'MyPublications',
            path:'/dashboard/myPublications',
        },
        {
            text:"ComposePublication",
            path:"/dashboard/composePublication"
        }
    ]

    const [hoverIndex, setHoverIndex] = useState(-1);
    const [logoutHoverIndex, setLogoutHoverIndex] = useState(-1);
    return (

        <Router>
            <div style={{display:'flex',flexDirection:'column'}}>
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
                            <Publications/>
                        </Route>
                        <Route exact path={"/dashboard/myPublications"}>
                            <MyPublications/>
                        </Route>
                        <Route path={"/dashboard/composePublication"}>
                            <ComposePublication/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>

    );
}

export default Navigation;
