const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionsSchema = new Schema({

    question: {
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    },
    isAnswered: {
        type: Boolean,
        required: true
    },
    isMarked: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    suport: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: false
    }
}, { timestamps: true });

const QuestionsModel = mongoose.model('questions', QuestionsSchema);

module.exports = QuestionsModel;
