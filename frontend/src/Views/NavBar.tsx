import React, { Component, Props } from "react";

import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Typography
} from "@material-ui/core";
import { BrowserRouter, Router, Link, withRouter } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import logo from "./Img/ntig_logo_vit.png";

const classes = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    appBar: {
        backgroundColor: "#222"
    },
    loginButton: {
        marginRight: "1rem"
    }
};
export class NavBar extends Component<{ isLoggedIn: boolean }, any> {
    constructor(props: any) {
        super(props);
        this.isLoggedIn = false;
    }
    public state = {
        open: true
    };
    componentWillReceiveProps(props: Readonly<{ isLoggedIn: boolean }>) {
        this.isLoggedIn = props.isLoggedIn;
    }
    private isLoggedIn: boolean;
    public render() {
        const path = window.location.pathname;
        console.log("navbar login?: " + this.isLoggedIn);

        return (
            <AppBar style={classes.appBar} position="sticky">
                <Toolbar disableGutters={!this.state.open}>
                    <IconButton color="inherit" aria-label="Menu" />
                    <img width="40" height="40" src={logo} alt="" />
                    <Typography
                        variant="title"
                        color="inherit"
                        style={classes.flex}
                    />

                    {this.isLoggedIn ? null : (
                        <div>
                            <Button
                                href="/auth/login"
                                style={classes.loginButton}
                                variant="outlined"
                                color="inherit"
                            >
                                Logga in
                            </Button>
                        </div>
                    )}
                    {this.isLoggedIn && path !== "/auth/signup" ? null : (
                        <Button
                            href="/auth/signup"
                            variant="outlined"
                            color="inherit"
                        >
                            Skapa ett konto
                        </Button>
                    )}

                    {this.isLoggedIn && (
                        <Button
                            href="/auth/logout"
                            variant="outlined"
                            color="inherit"
                        >
                            Logga ut
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        );
    }
}
