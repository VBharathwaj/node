const moment = require('moment');

const currdatetime = new Date();

const meetingController = (Counter, Meeting, Log) => {
    // Logger Function
    const logger = (username, logdata) => {
        const tempLogs = {
            created_at: moment().format(),
            user: username,
            log_data: logdata,
        };
        const logData = new Log(tempLogs);
        logData.save();
    };
    // Get the current counter value
    const getCounterValue = (req, res) => {
        Counter.findOne().sort('-_id').exec((err, data) => {
            if (err) res.send(err);
            else res.send(data);
        });
    };
    // Used for initiating counter table data
    const postCounterValue = (req, res) => {
        req.body.created_at = moment().format();
        const intiationData = new Counter(req.body);
        intiationData.save();
        res.status(201).send('Data Inserted in Counter Database!');
    };
    // Middleware used for view, edit and delete functions
    const getById = (req, res, next) => {
        Meeting.findById(req.body._id, (err, meetingDetails) => {
            if (err) res.status(500).send(err);
            else if (meetingDetails) {
                req.meeting = meetingDetails;
                next();
            } else res.status(404).send('Meeting Data Unavailable!!');
        });
    };
    // Creating/Saving a new meeting
    const addMeeting = (req, res) => {
        req.body.created_at = moment().format();
        const meetingDetails = new Meeting(req.body);
        meetingDetails.save();
        const newCounterValue = {
            counterValue: req.body.meeting_number,
            created_by: req.body.created_by,
        };
        const intiationData = new Counter(newCounterValue);
        intiationData.save();
        logger('Default', `Created a new meeting ${req.body.meeting_number} : ${req.body.title}`);
        res.status(201).send('Meeting Saved!');
    };
    // Get the current meeting details
    const getMeeting = (req, res) => {
        res.json(req.meeting);
    };
    // Updates the meeting details
    const updateMeeting = (req, res) => {
        if (moment(currdatetime).isAfter(req.meeting.start_date)) {
            res.status('200').send('Completed meetings cannot be updated!');
        } else {
            if (req.meeting._id) delete (req.meeting._id);
            Object.keys(req.body).forEach((key) => {
                req.meeting[key] = req.body[key];
            });
            req.meeting.save();
            logger('Default', `Updated meeting ${req.meeting.meeting_number} : ${req.meeting.title}`);
            res.status('200').send('Meeting has been updated!');
        }
    };
    // Cancells the meeting details
    const cancelMeeting = (req, res) => {
        if (moment(currdatetime).isAfter(req.meeting.start_date)) {
            res.status('200').send('Completed meetings cannot be cancelled!');
        } else {
            if (req.meeting._id) delete (req.meeting._id);
            req.meeting.status = 'Cancelled';
            req.meeting.save();
            logger('Default', `Cancelled a meeting ${req.meeting.meeting_number} : ${req.meeting.title}`);
            res.status('200').send('Meeting has been cancelled!');
        }
    };
    // Deletes the selected meeting
    const deleteMeeting = (req, res) => {
        req.meeting.remove();
        logger('Default', `Deleted a meeting ${req.meeting.meeting_number} : ${req.meeting.title}`);
        res.json(req.meeting);
    };
    // Gets the list of all meetings
    const getMeetings = (req, res) => {
        Meeting.find((err, meetingList) => {
            if (err) res.status(500).send(err);
            else if (meetingList) res.json(meetingList);
            else res.status(404).send('No Meeting Data Unavailable!!');
        });
    };
    // Returning the functions
    return {
        getCounterValue,
        postCounterValue,
        getById,
        getMeeting,
        addMeeting,
        updateMeeting,
        cancelMeeting,
        deleteMeeting,
        getMeetings,
    };
};

module.exports = meetingController;
