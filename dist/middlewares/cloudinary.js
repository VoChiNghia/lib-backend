"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: 'dd1y089s0',
    api_key: '634192681127148',
    api_secret: 'uGMf6lqggQ2SCJ9nWUB3KyyXStw'
});
const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary_1.v2.uploader.upload(fileToUploads, (err, result) => {
            resolve({
                url: result?.url,
                public_id: result?.public_id
                // Add other properties from the result as needed
            });
        });
    });
};
exports.default = cloudinaryUploadImg;
