const {
    Questions,
} = require('../data');


const add = async (user_question, answer, isAnswered, isMarked, user_id) => {
    const question = new Questions({
        question: user_question,
        answer: answer,
        isAnswered: isAnswered,
        isMarked: isMarked,
        user: user_id
    });
    await question.save();
    return question._id;
};

const getAll = async () => {
    return await Questions.find().populate({path:'user'});
};

const getAllAnswered = async () => {
    return await Questions.find({isAnswered: true}).populate({path:'user'});
};

const getAllMarked = async () => {
    return await Questions.find({isAnswered: true, isMarked: true}).populate({path:'user'});
};

const getAllUnmarked = async () => {
    return await Questions.find({isAnswered: true, isMarked: false}).populate({path:'user'});
};

const getAllUnanswered = async () => {
    return await Questions.find({isAnswered: false}).populate({path:'user'});
};


const getById = async (id) => {
    return await Questions.findById(id).populate({path:'user'});
};

const updateById = async (id, question, answer, isAnswered, isMarked, user_id, suport_id) => {
    await Questions.findByIdAndUpdate(id, {question, answer, isAnswered, isMarked, user_id, suport_id});
};

const deleteById = async (id) => {
    await Questions.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    getAllAnswered,
    getAllMarked,
    getAllUnanswered,
    getAllUnmarked
}