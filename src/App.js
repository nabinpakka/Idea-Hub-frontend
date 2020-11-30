import React, {useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import AuthService from "./services/auth/Auth.Service";

import LandingPage from "./components/landingPage/LandingPage";
import Navigation from "./components/dashboard/navigationBar/Navigation";
function App() {

    useEffect(()=>{
        return function clearLocalStorage(){
            console.log("here")
            AuthService.logout().then(()=>{
                console.log("cleaned")
            })
        }
    })


    return (
        <Router>
            <div style={{width:"100%",display:'flex',flexDirection:'column'}}>
                <Switch>

                    <Route exact path={"/dashboard/home"}>
                        <Navigation />
                    </Route>

                    <Route path={"/"}>
                        <LandingPage/>
                    </Route>

                    //without adding this refreshing the page will give blank
                    //this is because the root does not know paths inside of navigations
                    <Route exact path={"/dashboard/myPublications"}>
                        <Navigation/>
                    </Route>

                    <Route exact path={"/dashboard/toReview"}>
                        <Navigation/>
                    </Route>

                    <Route exact path={"/dashboard/composePublication"}>
                        <Navigation/>
                    </Route>

                </Switch>

            </div>
        </Router>
    )
}

export default App;
