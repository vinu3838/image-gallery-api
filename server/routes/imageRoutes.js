const express = require('express');
const router = express.Router();

const auth = require('./../middleware/auth');
const imageUpload = require('./../middleware/imageUpload');
const {
    uploadImage,
    getImages,
    deleteImage
} = require('../controllers/image');

router.get('/', auth, getImages);
router.post('/upload', auth, imageUpload, uploadImage);
router.delete('/:imageId', auth, deleteImage);

module.exports = router;
