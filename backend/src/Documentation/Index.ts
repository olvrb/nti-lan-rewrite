import { GetDocsInfo } from "./Utilities/GetDocs";
import { join } from "path";

export async function GenerateDocs() {
    GetDocsInfo(join(__dirname, "../Controllers"));
}
