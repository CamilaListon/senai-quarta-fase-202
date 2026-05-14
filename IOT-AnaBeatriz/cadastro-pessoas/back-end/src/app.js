import { app } from "./app.js";
import dotenv from "dotenv"
import cors from "cors"

const app = express();
app.use(cors)

app.get('/', (req, res) => {
    res.send('this is test');
});


dotenv.config();

