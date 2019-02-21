import "../App.css";

import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    OutlinedInput,
    Typography,
    Checkbox,
    FormControlLabel,
    TextField,
    Grid
} from "@material-ui/core";
import React, {
    ChangeEvent,
    Component,
    FormEvent,
    Props,
    RefObject
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
        marginRight: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    fullWidthField: {
        minWidth: "200%"
    },
    formTitle: {
        marginTop: "1rem"
    },
    inputField: {
        marginBottom: "1rem"
    }
};

export class Signup extends Component {
    constructor(props: Props<Component>) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        email: "",
        password: "",
        nationalId: "",
        name: "",
        surname: "",
        phone: "",
        adultPhone: "",
        address: "",
        postcode: "",
        city: "",
        loading: false
    };
    async handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.setState({ loading: true });
        console.log(this.state);
        return;
        const { status } = await ApiClient.Auth.Signup(
            this.state.email,
            this.state.password,
            this.state.nationalId,
            this.state.name,
            this.state.surname,
            this.state.phone,
            this.state.adultPhone,
            this.state.address,
            this.state.postcode,
            this.state.city
        );
        this.setState({ loading: false });
        if (status) {
            return (document.location.href = "/auth/login");
        }
    }
    handleChange(e: ChangeEvent<HTMLInputElement>) {
        const newState: any = {};
        newState[e.target.name] = e.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div style={classes.loginContainer}>
                <form onSubmit={this.handleFormSubmit}>
                    <Grid
                        alignItems="flex-start"
                        direction="column"
                        spacing={8}
                        container
                    >
                        <Grid item>
                            <Typography
                                style={classes.formTitle}
                                variant="h2"
                                gutterBottom
                            >
                                Skapa ett konto
                            </Typography>
                        </Grid>
                        <Grid xs={12} item container>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    className="inputField"
                                    onChange={this.handleChange}
                                    type="text"
                                    labelWidth={45}
                                    name="email"
                                />
                            </FormControl>
                        </Grid>
                        <Grid xs={12} item container>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Lösenord</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    className="inputField"
                                    onChange={this.handleChange}
                                    type="password"
                                    labelWidth={70}
                                    name="password"
                                />
                            </FormControl>
                        </Grid>
                        <Grid
                            spacing={8}
                            justify="flex-start"
                            direction="row"
                            item
                            container
                        >
                            <Grid xs={6} item>
                                <FormControl variant="outlined">
                                    <InputLabel>Förnamn</InputLabel>
                                    <OutlinedInput
                                        className="inputField"
                                        onChange={this.handleChange}
                                        type="text"
                                        labelWidth={70}
                                        name="name"
                                        autoComplete="given-name"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid xs={6} item>
                                <FormControl variant="outlined">
                                    <InputLabel>Efteramn</InputLabel>
                                    <OutlinedInput
                                        className="inputField"
                                        onChange={this.handleChange}
                                        type="text"
                                        labelWidth={70}
                                        autoComplete="family-name"
                                        name="surname"
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            container
                            spacing={0}
                            direction="column"
                            alignItems="center"
                            justify="center"
                            style={{ marginBottom: "1rem" }}
                        >
                            <FormControl variant="outlined">
                                <Button type="submit" variant="outlined">
                                    Skapa konto
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </form>
            </div>

            // <div style={classes.loginContainer}>
            //     <form onSubmit={this.handleFormSubmit} id="form">
            //         <Column>
            //             <Row horizontal="center">
            //                 <Typography
            //                     style={{ marginTop: "1rem" }}
            //                     component="h4"
            //                     variant="h3"
            //                     gutterBottom
            //                 >
            //                     Skapa ett konto
            //                 </Typography>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Email</InputLabel>
            //                     <OutlinedInput
            //                         name="email"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         type="text"
            //                         labelWidth={45}
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Lösenord</InputLabel>
            //                     <OutlinedInput
            //                         name="password"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="password"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Personnummer</InputLabel>
            //                     <OutlinedInput
            //                         name="nationalId"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Column wrap={true} horizontal="start">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Förnamn</InputLabel>
            //                     <OutlinedInput
            //                         name="name"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Column>
            //             <Column wrap={true} horizontal="end">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Efternamn</InputLabel>
            //                     <OutlinedInput
            //                         name="surname"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Column>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Telefonnummer</InputLabel>
            //                     <OutlinedInput
            //                         name="phone"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>
            //                         Telefonnummer till ansvarig
            //                     </InputLabel>
            //                     <OutlinedInput
            //                         name="adultPhone"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Adress</InputLabel>
            //                     <OutlinedInput
            //                         name="address"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Postnummer</InputLabel>
            //                     <OutlinedInput
            //                         name="postcode"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row horizontal="center">
            //                 <FormControl variant="outlined">
            //                     <InputLabel>Postort</InputLabel>
            //                     <OutlinedInput
            //                         name="city"
            //                         className="inputField"
            //                         onChange={this.handleChange}
            //                         labelWidth={75}
            //                         type="text"
            //                     />
            //                 </FormControl>
            //             </Row>
            //             <Row className="inputField" horizontal="center">
            //                 <Button
            //                     disabled={this.state.loading}
            //                     type="submit"
            //                     variant="outlined"
            //                 >
            //                     Skapa konto
            //                 </Button>
            //                 {this.state.loading && (
            //                     <CircularProgress
            //                         style={{ position: "absolute" }}
            //                     />
            //                 )}
            //             </Row>
            //         </Column>
            //     </form>
            // </div>
        );
    }
}
