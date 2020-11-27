import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

import LandingPage from "./components/landingPage/LandingPage";
import Navigation from "./components/dashboard/navigationBar/Navigation";
function App() {
    return (

        <Router>
            <div style={{width:"100%",display:'flex',flexDirection:'column'}}>
                {/*<LandingPage/>*/}
                {/*<Navigation/>*/}
                <Switch>
                    <Route exact path={"/"}>
                        <LandingPage/>
                    </Route>
                    <Route exact path={"/dashboard/home"}>
                        <Navigation/>
                    </Route>

                </Switch>

            </div>
        </Router>
    )
}

export default App;
