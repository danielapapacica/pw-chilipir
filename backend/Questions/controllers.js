const express = require('express');

const QuestionsService = require('./services.js');
const nodemailer = require('nodemailer');


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



const sendemail = async (email, answer) => {


    let transporter = nodemailer.createTransport({
        service: `${process.env.EMAIL_SERVICE}`,
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        }
      });
      
      let mailOptions = {
        from:  `${process.env.EMAIL}`,
        to: email,
        subject: '[Chilipir.ro - raspuns echipa suport]',
        text: answer
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};


router.post('/', authorizeAndExtractToken, authorizeRoles('user','admin'), async (req, res, next) => {
    const {
        question
    } = req.body;


    const fieldsToBeValidated = {
        question: {
            value: question,
            type: 'text'
        }
    };

    try {
        validateFields(fieldsToBeValidated);

        //extragem identitatea utilizatorului din token
        const token = (req.header('Authorization').split(" "))[1];
        const decoded = await verifyAndDecodeData(token);


        await QuestionsService.add(question, "-", false, false, decoded.userId);
    } catch (err) {
        next(err);
    }
});


router.get('/', async (req, res, next) => {

    let type = req.query.type;

    try {
        let questions = [];

        switch(type){
            case 'all':
                questions = await QuestionsService.getAll();
            break;

            case 'answered':
                questions = await QuestionsService.getAllAnswered();
            break;

            case 'marked':
                questions = await QuestionsService.getAllMarked();
            break;

            case 'unanswered':
                questions = await QuestionsService.getAllUnanswered();
            break;

            case 'unmarked':
                questions = await QuestionsService.getAllUnmarked();
            break;

            default:
                questions = await QuestionsService.getAll();
            break;
        }
    
    res.json(questions);
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
        const question = await QuestionsService.getById(id);
        res.json(question);
    } catch (err) {
        next(err);
    }
});



router.put('/answer/:id', authorizeAndExtractToken, authorizeRoles('suport','admin'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        answer
    } = req.body;


    const fieldsToBeValidated = {
        id: {
            value: id,
            type: 'ascii'
        },
        answer: {
            value: answer,
            type: 'text'
        }
    };


    try {
        validateFields(fieldsToBeValidated);

        //extragem identitatea utilizatorului cu rol de suport din token
        const token = (req.header('Authorization').split(" "))[1];
        const decoded = await verifyAndDecodeData(token);

        const question = await QuestionsService.getById(id);
        await QuestionsService.updateById(id, question.question, answer, true, question.isMarked, question.user._id, decoded.userId);


        let completeAnswer = `Draga ${question.user.name},\n\n`
                            + answer + `\n\n Echipa suport chilipir.ro`;
        sendemail(question.user.email, completeAnswer);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});


router.put('/mark/:id', authorizeAndExtractToken, authorizeRoles('suport','admin'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        marking
    } = req.body;



    const fieldsToBeValidated = {
        id: {
            value: id,
            type: 'ascii'
        }
    };


    try {
        validateFields(fieldsToBeValidated);

        const question = await QuestionsService.getById(id);
        await QuestionsService.updateById(id, question.question, question.answer, question.isAnswered, marking, question.user._id, question.userId);

        res.status(204).end();
    } catch (err) {
        next(err);
    }
});



module.exports = router;