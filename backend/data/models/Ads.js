const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdsSchema = new Schema({
    photo: [{
        type: String,
        required: true
    }],
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { timestamps: true });

const AdsModel = mongoose.model('ads', AdsSchema);

module.exports = AdsModel;
