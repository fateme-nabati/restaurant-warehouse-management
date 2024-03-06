import { app } from "../../main";
import { getAllWarehouses } from "./services/getAllWarehouses";

app.get('/warehouses', getAllWarehouses)