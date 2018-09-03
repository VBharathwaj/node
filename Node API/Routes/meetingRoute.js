const express = require('express');
const meetingCounter = require('../Models/meetingCounter');
const Meeting = require('../Models/meeting');
const Log = require('../Models/logs');
const meetingController = require('../Controllers/meetingController')(meetingCounter, Meeting, Log);

const meetingRouter = express.Router();

const routes = () => {
    meetingRouter.route('/').get(meetingController.getMeetings);
    meetingRouter.route('/createMeeting').get(meetingController.getCounterValue);
    meetingRouter.route('/addMeeting').post(meetingController.addMeeting);

    meetingRouter.use('/getMeeting', meetingController.getById);
    meetingRouter.use('/updateMeeting', meetingController.getById);
    meetingRouter.use('/cancelMeeting', meetingController.getById);

    meetingRouter.route('/getMeeting').post(meetingController.getMeeting);
    meetingRouter.route('/updateMeeting').patch(meetingController.updateMeeting);
    meetingRouter.route('/cancelMeeting').patch(meetingController.cancelMeeting);
    return meetingRouter;
};

module.exports = routes;
