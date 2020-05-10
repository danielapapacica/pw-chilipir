const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes');
const cors = require('cors');
require('dotenv').config();

const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));

app.use(helmet());
app.use(cors());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);


app.use((err, req, res, next) => {
    console.trace(err);
    let status = 500;
    let message = 'Something Bad Happened';
    if (err.httpStatus) {
        status = err.httpStatus;
        message = err.message;
    }
    res.status(status).json({
        error: message,
    });
});


app.listen(process.env.PORT, () => {
    console.log(`App is listening on ${process.env.PORT}`);
});
