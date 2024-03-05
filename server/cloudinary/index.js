const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// configuring using process.env because we don't want our cloud name, api or api password/secret
// going public when we push to github or deploy
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// storage is where our files/images will be stored in cloudinary that's why we are using the "new" keyword
// On newSermon.js route is where we will require storage since it's where we POST from
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'DCAirways',
        allowedFormats: ['jpeg', 'png', 'jpg']
    }
});

module.exports = {
    cloudinary,
    storage
}