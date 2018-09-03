const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app:main');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const properties = require('./properties.json');
const ContactCounter = require('./Models/contactCounter');
const MeetingCounter = require('./Models/meetingCounter');
const GroupCounter = require('./Models/groupCounter');

const meetingRouter = require('./Routes/meetingRoute')();
const contactRouter = require('./Routes/contactRoute')();
const userRouter = require('./Routes/userRoute')();
const groupRouter = require('./Routes/groupRoute')();

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect(`mongodb://${properties.database.hostname}:${properties.database.port}/${properties.database.name}`);

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/meeting', meetingRouter);
app.use('/contact', contactRouter);
app.use('/user', userRouter);
app.use('/group', groupRouter);

const intializer = (countername, Counter) => {
    mongoose.connection.db.listCollections({ name: countername })
        .next((err, collinfo) => {
            if (collinfo) debug(`${countername}: Collection Exists`);
            else {
                debug(`${countername}: Collection Does Not Exists`);
                const intiationData = new Counter({ counterValue: 0 });
                intiationData.save();
                debug(`${countername}: Collection Created!`);
            }
        });
};

app.get('/', (req, res) => {
    intializer('contactcounters', ContactCounter);
    intializer('meetingcounters', MeetingCounter);
    intializer('groupcounters', GroupCounter);
    res.send('Application Loading!');
});

app.listen(port, () => {
    debug(`Listening to Port: ${chalk.green(port)}`);
});
