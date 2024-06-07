import { v2 as cloudinary } from 'cloudinary';
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });



  const cloudUpload = async function (fileBuffer) {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url || result.url);
        }
      });
  
      // Create a readable stream from the file buffer
      const bufferStream = streamifier.createReadStream(fileBuffer);
  
      // Pipe the buffer stream to the upload stream
      bufferStream.pipe(uploadStream);
    });
  };

  
export default cloudUpload;