import express from 'express';
import {connect} from "./database/database-source";

const PORT  =  process.env.PORT || 4000;
const app = express();



async function startServer() {
    try {
      await connect();
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error("Failed to connect to the database:", error);
    }
  }


  startServer();