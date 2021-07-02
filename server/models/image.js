const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    storageName: {
        type: String,
        required: true
    },
    createdUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

module.exports = mongoose.model('Image', imageSchema);
