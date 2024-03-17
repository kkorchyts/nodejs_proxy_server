import {fileURLToPath} from "url";
import {dirname} from "path";

export const __dirname = (metaurl) => {
    return dirname(fileURLToPath(metaurl));
}