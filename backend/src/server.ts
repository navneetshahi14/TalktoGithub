import app from "./app";
import { ENV } from "./config/ENV";
const port = ENV.PORT || 6969



app.listen(port,()=>console.log(`Server is running at port no. :-> ${port}`));