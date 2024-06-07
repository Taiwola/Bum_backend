import express, {Request, Response} from 'express';
// import path from "path";
// import util from "util";
// import fs from "fs";

const uploadRouter = express.Router();

import upload from '../middleware/multer';
import cloudUpload from '../util/cloudinary';
import { authentication } from '../middleware/authentication';

// const unlinkFile = util.promisify(fs.unlink);

uploadRouter.post('/', upload, authentication,async (req: Request, res: Response) => {
  try{
    const buffer = req.file.buffer;
    const url = await cloudUpload(buffer);

    return res.json({message: "upload successful",  data: url });
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: "not uploaded"});
  }
});

// uploadRouter.post('/avatar', upload.single('file'), (req, res) => {
//   if (req.file) {
//     const buffer = req.file.buffer;
//     res.json({ url: req.file.path });
//   } else {
//     res.status(400).send('No file uploaded');
//   }
// });

// uploadRouter.post('/subaccountLogo', upload.single('file'), (req, res) => {
//   if (req.file) {
//     res.json({ url: req.file.path });
//   } else {
//     res.status(400).send('No file uploaded');
//   }
// });

// uploadRouter.post('/media', upload.single('file'), (req, res) => {
//   if (req.file) {
//     res.json({ url: req.file.path });
//   } else {
//     res.status(400).send('No file uploaded');
//   }
// });

export {uploadRouter as CloudUpload};