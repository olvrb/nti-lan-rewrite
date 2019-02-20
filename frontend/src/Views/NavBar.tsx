import React, { Component } from "react";

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
export class NavBar extends Component {
    public state = {
        open: true
    };

    public render() {
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
                    <Button
                        href="/auth/login"
                        style={classes.loginButton}
                        variant="outlined"
                        color="inherit"
                    >
                        Logga in
                    </Button>

                    <Button
                        href="/auth/signup"
                        variant="outlined"
                        color="inherit"
                    >
                        Skapa ett konto
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}
