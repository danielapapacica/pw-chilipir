const {
    Users
} = require('../data');

const {
    generateToken, verifyAndDecodeData
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const nodemailer = require('nodemailer');



const sendemail = async (email, textEmail) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.EMAIL_PASSWORD}`
        }
      });
      
      let mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: '[Chilipir.ro - creare cont]',
        text: textEmail
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};


const add = async (name, username, password, email, phone, location) => {

    let textEmail = 'Buna ' + name + '!\n\nFelicitari! Tocami ti-ai creat cont pe Chilipir.ro\nSperam sa fie o experienta cat mai placuta. Spor la cumparat!\n\nEchipa Chilipir.ro'

    sendemail(email, textEmail);

    const hashedPassword = await hash(password);
    const role = 'user';
    const user = new Users({
        name: name,
        username: username,
        password: hashedPassword,
        email: email,
        phone: phone,
        location: location,
        role: role
    });
    await user.save();
};

const getUsers = async () => {
    return await Users.find();
};

const getProfile = async (token) => {

    const decoded = await verifyAndDecodeData(token);
    return await Users.findById(decoded.userId);
};

const authenticateWithUsername = async (username, password) => {

    const user = await Users.findOne({ username });
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Combinatia de username si parola nu este buna!", 404);
};


const authenticateWithEmail = async (email, password) => {


    const user = await Users.findOne({ email });
    if (user === null) {
        throw new ServerError(`Utilizatorul inregistrat cu ${email} nu exista!`, 404);
    }
    
    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            userRole: user.role
        });
    } 
    throw new ServerError("Combinatia de email si parola nu este buna!", 404);
};


module.exports = {
    add, getUsers, authenticateWithUsername, authenticateWithEmail, getProfile
}