import "../App.css";

import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography
} from "@material-ui/core";
import React, {
    ChangeEvent,
    Component,
    FormEvent,
    Props,
    RefObject,
    SyntheticEvent
} from "react";
// @ts-ignore
import { Column, Row } from "simple-flexbox";

import { ApiClient } from "../Api/ApiClient";

const classes = {
    loginContainer: {
        border: "1px solid white",
        background: "inherit",
        borderRadius: "8px",
        marginTop: "1rem",
        minWidth: "20rem",
        maxWidth: "30rem",
        marginLeft: "auto",
        marginRight: "auto"
    },
    inputField: {
        marginBottom: "1rem"
    }
};

export class Login extends Component {
    constructor(props: Props<Component>) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.emailLabel = React.createRef();
    }
    state = {
        password: "",
        email: "",
        loading: false
    };
    async handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ loading: true });
        const { status } = await ApiClient.Auth.Login(
            this.state.email,
            this.state.password
        );
        this.setState({ loading: false });
        console.log(status);
        if (status) {
            return (document.location.href = "/book");
        }
    }
    handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ password: e.currentTarget.value });
    }
    handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.currentTarget.value });
    }
    private emailLabel: RefObject<InputLabel>;
    render() {
        return (
            <div style={classes.loginContainer}>
                <form onSubmit={this.handleFormSubmit} id="form">
                    <Column>
                        <Row horizontal="center">
                            <Typography
                                style={{ marginTop: "1rem" }}
                                component="h4"
                                variant="h3"
                                gutterBottom
                            >
                                Logga in
                            </Typography>
                        </Row>
                        <Row horizontal="center">
                            <FormControl variant="outlined">
                                <InputLabel ref={this.emailLabel}>
                                    Email
                                </InputLabel>
                                <OutlinedInput
                                    className="inputField"
                                    onChange={this.handleEmailChange}
                                    id="email"
                                    type="text"
                                    labelWidth={45}
                                />
                            </FormControl>
                        </Row>
                        <Row horizontal="center">
                            <FormControl variant="outlined">
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    className="inputField"
                                    onChange={this.handlePasswordChange}
                                    labelWidth={75}
                                    type="password"
                                />
                            </FormControl>
                        </Row>
                        <Row className="inputField" horizontal="center">
                            <Button
                                disabled={this.state.loading}
                                type="submit"
                                variant="outlined"
                                id="submit"
                            >
                                Sign In
                            </Button>
                            {this.state.loading && (
                                <CircularProgress
                                    style={{ position: "absolute" }}
                                />
                            )}
                        </Row>
                    </Column>
                </form>
            </div>
        );
    }
}
