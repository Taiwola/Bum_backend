import {config} from "dotenv";
import express from 'express';
import {connect} from "./database/database-source";
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import session from 'express-session';


config();
// declare global namespace
declare global {
  namespace Express {
    interface Request {
      user?: {
        id?: string 
        email?: string
      };
    }
  }
}

// import routes
import {authRouter} from "./routes/auth.route";
import { agencyRoute } from './routes/agency.route';
import { userRouter } from './routes/user.route';
import { createRouteHandler } from 'uploadthing/express';
import { uploadRouter } from './uploadthing/uploadthing';
import { CloudUpload } from './routes/upload.route';
import {notificationRouter} from "./routes/notification.route";
import { subAccountRouter } from './routes/subaccount.route';
import { permissionRoute } from './routes/permission.route';
import {invitationRoute} from "./routes/invitation.route";
import {mediaRouter} from "./routes/media.route";


const PORT  =  process.env.PORT || 4000;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend origin
  credentials: true, // This allows cookies and other credentials to be sent
};

// middleware setup
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(corsOptions));
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

app.use(
  "/api/uploadthing",
  createRouteHandler({
    router: uploadRouter,
    config: {
       uploadthingSecret: process.env.UPLOADTHING_SECRET,
       uploadthingId: process.env.UPLOADTHING_APP_ID,
    },
  }),
);


// use route
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/agency', agencyRoute);
app.use('/api/upload', CloudUpload);
app.use('/api/notification', notificationRouter);
app.use('/api/subaccount', subAccountRouter);
app.use('/api/permissions', permissionRoute);
app.use("/api/invitation", invitationRoute);
app.use('/api/media', mediaRouter);


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