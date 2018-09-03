const express = require('express');
const Counter = require('../Models/groupCounter');
const Group = require('../Models/group');
const Contact = require('../Models/contact');
const Log = require('../Models/logs');
const groupController = require('../Controllers/groupController')(Counter, Group, Contact, Log);

const grouptRouter = express.Router();

const routes = () => {
    grouptRouter.route('/').get(groupController.getGroups);
    grouptRouter.route('/createGroup').get(groupController.getCounterValue);
    grouptRouter.route('/addGroup').post(groupController.addGroup);

    grouptRouter.use('/getGroupMembers', groupController.getById);
    grouptRouter.use('/updateGroup', groupController.getById);
    grouptRouter.use('/deleteGroup', groupController.getById);

    grouptRouter.route('/getGroupMembers').post(groupController.getGroupMembers);
    grouptRouter.route('/updateGroup').patch(groupController.updateGroup);
    grouptRouter.route('/deleteGroup').delete(groupController.deleteGroup);
    return grouptRouter;
};

module.exports = routes;
