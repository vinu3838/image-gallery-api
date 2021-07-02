const Image = require('./../models/image');
const User = require('./../models/user');
const path = require('path');
const fs = require('fs');

const uploadImageService = async ({ file, userId }) => {
    if (!file) {
        const error = new Error('Kindly attach a image');
        error.statusCode = 400;
        throw error;
    }
    const image = new Image({
        name: file.originalname,
        storageName: file.filename,
        createdUser: userId
    });
    const uploadedImage = await image.save();
    const user = await User.findById(userId);
    user.createdImages.push(image);
    await user.save();
    return uploadedImage;
}

const getImagesService = async (userId, isAdmin) => {
    let images;
    if (isAdmin) {
        images = await Image.find();
        return images;
    }
    images = await User.findById(userId).populate('createdImages').select('createdImages');
    return images.createdImages;
}

const deleteImageService = async (imageId, userId, isAdmin) => {
    const imageTobeRemoved = await Image.findById(imageId);
    if (!imageTobeRemoved) {
        const error = new Error('Image not found to be deleted');
        error.statusCode = 404;
        throw error;
    }
    if (!isAdmin) {
        if (imageTobeRemoved.createdUser.toString() !== userId.toString()) {
            const error = new Error('This deletion is not allowed');
            error.statusCode = 403;
            throw error;
        }
    }
    await Image.findByIdAndDelete(imageId);
    clearImage(imageTobeRemoved.storageName)
    const user = await User.findById(userId);
    user.createdImages.pull(imageId);
    await user.save();
    return { id: imageTobeRemoved._id }
}

const clearImage = filePath => {
    // eslint-disable-next-line no-undef
    filePath = path.join(process.env.IMAGE_UPLOAD_DIRECTORY,filePath);
    fs.unlink(filePath, err => console.log(err));
};


module.exports = {
    uploadImageService,
    getImagesService,
    deleteImageService
}