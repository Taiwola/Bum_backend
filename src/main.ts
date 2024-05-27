import express from 'express';
import {connect} from "./database/database-source";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const PORT  =  process.env.PORT || 4000;
const app = express();


// middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: '*'
}));
app.use(helmet());
app.use(session({
  secret: process.env.SESSION_SECRET as string,
  saveUninitialized: true,
  cookie: {secure: false, maxAge: 1000 * 60 * 60 * 24},
  resave: false
}));
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');



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