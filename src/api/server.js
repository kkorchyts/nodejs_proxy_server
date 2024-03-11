import {config} from "../config/config.js";
import {app} from "./app.js"

const port = config.appServerConfig.port;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
