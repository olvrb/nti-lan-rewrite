import { ConnectionOptions } from "typeorm";
export class Configuration {
    public static Web = {
        Port: 3224 || process.env.PORT,
        Secret: "u9p8ruasp9f8udsöoifjao8uq23orjosaifj",
        Site: {
            Title: "PåskLAN 2019",
            Tournaments: [
                "Smash",
                "League of Legends",
                "Counter Strike: Globl Offensive"
            ]
        }
    };
    public static SeatsIO = { PrivateKey: "", PublicKey: "", EventKey: "" };
    public static Mail = {
        From: "",
        Domain: "",
        ApiKey: ""
    };
    public static Database: ConnectionOptions = {
        type: "postgres",
        host: "localhost",
        port: 5432,
        database: "nti-lan",
        synchronize: true,
        username: "postgres",
        password: "123"
    };
}
