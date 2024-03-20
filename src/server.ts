import { config } from "./config/config";
import { app } from "./app";

const port = config.appServerConfig.port;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
