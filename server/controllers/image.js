const { uploadImageService, getImagesService, deleteImageService } = require('./../services/image');

const uploadImage = async (req, res, next) => {
    try {
        const image = await uploadImageService(req);
        res.send(image);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

const getImages = async (req, res, next) => {
    try {
        const images = await getImagesService(req.userId, req.isAdmin);
        res.send(images);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

const deleteImage = async (req, res, next) => {
    try {
        const image = await deleteImageService(req.params.imageId, req.userId, req.isAdmin);
        res.send(image);
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

module.exports = {
    uploadImage,
    getImages,
    deleteImage
}
