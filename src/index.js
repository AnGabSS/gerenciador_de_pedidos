import express from "express";
import { createRequire } from "module";
import swaggerUi from 'swagger-ui-express';
import router from "./routes/routes.js";

const require = createRequire(import.meta.url);
const swaggerFile = require("../swagger-output.json");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "http://localhost"

app.use(express.json());    
app.use("/api", router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
    const rootUrl = `${host}:${port}`;

    console.log(`O servidor está rodando. Acesse pelo link ${rootUrl}`);
})