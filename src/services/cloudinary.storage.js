const cloudinary = require('cloudinary').v2;

cloudinary.config(cloudconfig);

/**
 * You can upload any file to your firebase storage in according to your firebase access config in config/firebase-storage.config.js
 * @returns Promise(done(publicUrl) ,err(error)) , all of those args can not be defined , if any error occured will be called in error before throwing for .catch
 * @param {File} file - The file get from multer or express-fileupload
 * @param {string | undefined} path - path inside the firebase buket (shoold be start with '/' ) ,
 *  this argment can contain the full name of the uploading file  ,
 *  if it is undefined the file will be uploaded in the root of the packet
 * @param {string | null | undefined} name - name/base name of file , if it is null/undefined , the name will be generated as a unique name using the current time seconds
 */

module.exports.upload = (file, path = null, name = null) => {
    return new Promise((done, error) => {
        cloudinary.uploader.upload_stream({
            public_id: name || new Date().getTime(),
            overwrite: false,
            folder: path || "/"
        }, (err, result) => {
            if (err) {
                if (error) error(err)
                throw err;
            }
            else
                if (done) done(result);
        }).end(file.buffer || file.data);
    })

}