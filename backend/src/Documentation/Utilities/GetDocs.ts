import { IControllerInfo } from "@docs/Interfaces/IContorllerInfo";
import {
    readdirSync,
    statSync,
    existsSync,
    mkdirSync,
    readFileSync,
    writeFileSync
} from "fs";
import { join } from "path";
import ejs from "ejs";

export async function GetDocsInfo(path: string): Promise<IControllerInfo[]> {
    const docs: IControllerInfo[] = [];
    const files = walkSync(path);

    for (const file of files) {
        const x = await import(file);
        if (x.Info) {
            docs.push(x.Info);
        }
    }
    LoadAndCompileDocs(docs);

    return docs;
}

async function LoadAndCompileDocs(docs: IControllerInfo[]) {
    const buildPath = join(__dirname, "../build");
    const templatePath = join(__dirname, "../../../views/docTemplate.ejs");
    const writePath = join(__dirname, "../../../public/doc.html");

    if (!existsSync(templatePath)) {
        throw new Error("No documentation template file found...");
    }
    if (!existsSync(buildPath)) mkdirSync(buildPath);

    // const template = ejs.compile(readFileSync(templatePath));
    const file = readFileSync(templatePath, "utf8");
    const uniqueCategories = GetUniqueCategories(docs);
    // const template = ejs.render(file, {
    //     docs,
    //     categories: uniqueCategories
    // });

    // writeFileSync(writePath, template, "utf8");
}

function GetUniqueCategories(docs: IControllerInfo[]): string[] {
    const categories: string[] = [];
    for (const doc of docs) {
        categories.push(
            `${doc.Category.charAt(0).toUpperCase()}${doc.Category.slice(1)}`
        );
    }

    return [...new Set(categories)];
}

const walkSync = (path: string, filelist?) => {
    const files = readdirSync(path);
    filelist = filelist || [];
    files.forEach((file) => {
        if (statSync(join(path, file)).isDirectory()) {
            filelist = walkSync(join(path, file), filelist);
        } else {
            if (!file.includes("map")) {
                filelist.push(join(path, file));
            }
        }
    });
    return filelist;
};
