import React, { Component, Props } from "react";
import "./App.css";
import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline
} from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./Views/NavBar";
import { Login } from "./Views/Login";
import { ApiClient } from "./Api/ApiClient";
import { Home } from "./Views/Home";
import { Signup } from "./Views/Signup";

class App extends Component {
    constructor(props: Props<Component>) {
        super(props);
        this.ApiClient = new ApiClient();
    }
    state = {
        isLoggedIn: false
    };

    componentDidMount() {
        ApiClient.Auth.IsLoggedIn().then((resp) => {
            console.log(resp);
            this.setState({ isLoggedIn: resp });
        });
    }
    public ApiClient: ApiClient;
    render() {
        return (
            <MuiThemeProvider
                theme={createMuiTheme({
                    palette: { type: "dark" },
                    typography: {
                        fontFamily: "Soleto"
                    }
                })}
            >
                <CssBaseline />
                {console.log(this.state.isLoggedIn)}
                <NavBar isLoggedIn={this.state.isLoggedIn} />
                <BrowserRouter>
                    <Switch>
                        <Route exact={true} path="/" render={() => <Home />} />
                        <Route
                            exact={true}
                            path="/auth/login"
                            render={() => <Login />}
                        />
                        <Route
                            exact={true}
                            path="/auth/signup"
                            render={() => <Signup />}
                        />
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        );
    }
}

export default App;
