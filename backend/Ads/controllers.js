const express = require('express');

const AdsService = require('./services.js');
const multer = require('multer');
var fs = require('fs');

const {
    validateFields
} = require('../utils');

let adsPhotoDir = "./../frontend/public/images/ads-photos";

const {
    authorizeAndExtractToken
} = require('../security/Jwt');

const {
    authorizeRoles
} = require('../security/Roles');

const {
    verifyAndDecodeData
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const router = express.Router();


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const {
            id
        } = req.params;
      cb(null, adsPhotoDir + "/" + id + "/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
   
let upload = multer({ storage: storage })



router.post('/upload/:id', authorizeAndExtractToken, authorizeRoles('user','admin'), upload.single('image'), async (req, res, next) => {

    try {
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});



router.post('/', authorizeAndExtractToken, authorizeRoles('user','admin'), async (req, res, next) => {
    const {
        photo,
        title,
        price,
        location,
        description,
        category,
        user_id,
    } = req.body;


    const fieldsToBeValidated = {
        title: {
            value: title,
            type: 'ascii'
        },
        price: {
            value: price,
            type: 'number'
        },
        user_id: {
            value: user_id,
            type: 'alphanumeric'
        },
        description:{
            value: description,
            type: 'ascii'
        },
        category:{
            value: category,
            type: 'categories'
        },
        location:{
            value: location,
            type: 'location'
        }
    };

    try {
        validateFields(fieldsToBeValidated);
        let adId = await AdsService.add(photo, title, price, location, description, category, user_id);

        let dir = adsPhotoDir + `/${adId}/`;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        res.json(adId+'');
    } catch (err) {
        next(err);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const ads = await AdsService.getAll();
        res.json(ads);
    } catch (err) {
        next(err);
    }
});


router.get('/custom', async (req, res, next) => {
    let min = req.query.min;
    let max = req.query.max;
    let orderBy= req.query.orderBy;
    let category = req.query.category;
    let location = req.query.location;
    let searchString = req.query.searchString;

    let minField =min;
    let maxField =max;
    let locField =location;
    let orderField =orderBy;
    let categField =category;

    //set fields
    if(minField === "") min = 0;
    if(maxField === "") max = 99999999;
    if(locField === "Judet") location = "";
    if(categField === "/") category = "";
    
    let orderDir = 0;

    switch(orderField){
        case 'noi':
            orderDir = -1;
            orderBy = "createdAt";
            break;
        case 'vechi':
            orderDir = 1;
            orderBy = "createdAt";
            break;
        case 'scumpe':
            orderDir = -1;
            orderBy = "price";
            break;
        case 'ieftine':
            orderDir = 1;
            orderBy = "price";
            break;
    }


    try {
        const ads = await AdsService.customGetAll(min, max, orderBy, orderDir, category, location, searchString);
        res.json(ads);
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    const fieldsToBeValidated = {
        id: {
            value: id,
            type: 'ascii'
        }
    };

    try {
        validateFields(fieldsToBeValidated);
        const ad = await AdsService.getById(id);
        res.json(ad);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('user','admin'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        photo,
        title,
        price,
        location,
        description,
        category,
        user_id,
    } = req.body;


    /*const fieldsToBeValidated = {
        title: {
            value: title,
            type: 'ascii'
        },
        user_id: {
            value: user_id,
            type: 'ascii'
        },
        description:{
            value: description,
            type: 'ascii'
        },
        category:{
            value: category,
            type: 'categories'
        }
    };*/


    try {
        //validateFields(fieldsToBeValidated);
        await AdsService.updateById(photo, title, price, location, description, category, user_id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('user','admin'), async (req, res, next) => {
    const {
        id
    } = req.params;

    
    const fieldsToBeValidated = {
        id: {
            value: id,
            type: 'ascii'
        }
    };

    try {
        validateFields(fieldsToBeValidated);


        //extragem identitatea utilizatorului din token
        const token = (req.header('Authorization').split(" "))[1];
        const decoded = await verifyAndDecodeData(token);


        //identificam anuntul care trebuie sters
        const ad = await AdsService.getById(id);

        //verificam daca persoana care vrea sa stearga anuntul este cea care a postat-o
        if(decoded.userId+'' === ad.user._id+'' || decoded.userRole+'' === 'admin'){
            await AdsService.deleteById(id);
            res.status(204).end();
        }else{
            throw new ServerError('Nu sunteti autorizat sa accesati resursa!', 401);
        }

    } catch (err) {
        next(err);
    }
});

module.exports = router;