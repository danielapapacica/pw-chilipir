const {
    Ads,
} = require('../data');
const {
    Users
} = require('../data');


const add = async (photo, title, price, location, description, category, user_id) => {
    const ad = new Ads({
        photo: photo,
        title: title,
        price: price,
        location: location,
        description: description,
        category: category,
        user: user_id,
    });
    await ad.save();
    return ad._id;
};

const getAll = async () => {
    return await Ads.find().populate({path:'user'});
};


const customGetAll = async (min, max, orderBy, orderDir, category, location, searchString) => {
    if(orderBy === "price"){
        return await Ads.find({ price: {$lte : max, $gte: min}, 
            category: { $regex: '.*' + category + '.*'},
            location: { $regex: '.*' + location + '.*'},
            title: { $regex: '.*' + searchString + '.*'}
        })
        .populate({path:'user'}).sort({price : orderDir});
    }
    else{
        return await Ads.find({ price: {$lte : max, $gte: min}, 
            category: { $regex: '.*' + category + '.*'},
            location: { $regex: '.*' + location + '.*'},
            title: { $regex: '.*' + searchString + '.*'}
        })
        .populate({path:'user'}).sort({createdAt : orderDir});
    }
};

const getById = async (id) => {
    return await Ads.findById(id).populate({path:'user'});
};

const updateById = async (photo, title, price, location, description, category, user_id) => {
    await Ads.findByIdAndUpdate(id, {photo, title, price, location, description, category, user_id });
};

const deleteById = async (id, token) => {
    await Ads.findByIdAndDelete(id);
};

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
    customGetAll
}