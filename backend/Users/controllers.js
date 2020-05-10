const express = require('express');

const UsersService = require('./services.js');
const {
    validateFields
} = require('../utils');

const {
    authorizeAndExtractToken
} = require('../security/Jwt');

const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    const {
        name,
        username,
        password,
        email,
        phone,
        location
    } = req.body;

    const fieldsToBeValidated = {
        name: {
            value: name,
            type: 'name'
        },
        username: {
            value: username,
            type: 'username'
        },
        password: {
            value: password,
            type: 'text'
        },
        email:{
            value: email,
            type: 'email'
        },
        phone:{
            value: phone,
            type: 'phone'
        },
        location:{
            value: location,
            type: 'location'
        }
    };

    try {
        validateFields(fieldsToBeValidated);
        await UsersService.add(name, username, password, email, phone, location);
        res.status(201).end();
    } catch (err) {
        next(err);
    }
});


router.post('/login', async (req, res, next) => {
    const {
        usernameOrEmail,
        password
    } = req.body;

    if(usernameOrEmail.includes('@')){

        const fieldsToBeValidated = {
            email: {
                value: usernameOrEmail,
                type: 'email'
            },
            password: {
                value: password,
                type: 'text'
            }
        };
    
        try {
            validateFields(fieldsToBeValidated);
            const token = await UsersService.authenticateWithEmail(usernameOrEmail, password);
            res.status(200).json(token);

        } catch (err) {
            next(err);
        }

    }else{
        const fieldsToBeValidated = {
            username: {
                value: usernameOrEmail,
                type: 'username'
            },
            password: {
                value: password,
                type: 'text'
            }
        };
    
        try {
            validateFields(fieldsToBeValidated);
            const token = await UsersService.authenticateWithUsername(usernameOrEmail, password);
            res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    }
});

router.get('/profile', authorizeAndExtractToken, authorizeRoles('admin', 'user', 'suport'), async (req, res, next) => {
    try {

        const token = (req.header('Authorization').split(" "))[1];
        const user = await UsersService.getProfile(token);
        res.json(user);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});


router.get('/', async (req, res, next) => {
    res.json(await UsersService.getUsers());
});

module.exports = router;