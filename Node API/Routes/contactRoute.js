const express = require('express');
const Counter = require('../Models/contactCounter');
const Contact = require('../Models/contact');
const Log = require('../Models/logs');
const contactController = require('../Controllers/contactController')(Counter, Contact, Log);

const contactRouter = express.Router();

const routes = () => {
    contactRouter.route('/').get(contactController.getContacts);
    contactRouter.route('/createContact').get(contactController.getCounterValue);
    contactRouter.route('/addContact').post(contactController.addContact);

    contactRouter.use('/getContact', contactController.getById);
    contactRouter.use('/updateContact', contactController.getById);
    contactRouter.use('/deleteContact', contactController.getById);

    contactRouter.route('/getContact').post(contactController.getContact);
    contactRouter.route('/updateContact').patch(contactController.updateContact);
    contactRouter.route('/deleteContact').delete(contactController.deleteContact);
    return contactRouter;
};

module.exports = routes;
