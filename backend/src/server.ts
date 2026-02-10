import app from "./app";
import { connectDB } from "./config/db";
import ENV from "./config/ENV";
const port = ENV.PORT || 6969;

const startServer = async () => {
  await connectDB();

  app.listen(port, () =>
    console.log(`Server is running at port no. :-> ${port}`),
  );
};

startServer();
