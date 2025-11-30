import express from "express";
import router from "./routes/routes.js";

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "http://localhost"

app.use(express.json());    
app.use("/api", router)
app.listen(port, () => {
    const rootUrl = `${host}:${port}`;

    console.log(`O servidor está rodando. Acesse pelo link ${rootUrl}`);
})