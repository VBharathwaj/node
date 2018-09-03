const moment = require('moment');

const groupController = (Counter, Group, Contact, Log) => {
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
        Group.findById(req.body._id, (err, groupDetails) => {
            if (err) res.status(500).send(err);
            else if (groupDetails) {
                req.group = groupDetails;
                next();
            } else res.status(404).send('Contact Unavailable');
        });
    };
    // Creating/Saving a new contact
    const addGroup = (req, res) => {
        req.body.created_at = moment().format();
        const groupDetails = new Group(req.body);
        groupDetails.save();
        const newCounterValue = {
            counterValue: req.body.group_id,
            created_by: req.body.created_by,
        };
        const intiationData = new Counter(newCounterValue);
        intiationData.save();
        logger('Default', `Created a new Group ${req.body.user_group}`);
        res.status(201).send('Group Saved!');
    };
    // Updates the contact details
    const updateGroup = (req, res) => {
        if (req.group._id) delete (req.group._id);
        Object.keys(req.body).forEach((key) => {
            req.group[key] = req.body[key];
        });
        req.group.save();
        logger('Default', `Updated the group ${req.group.user_group}`);
        res.json(req.group);
    };
    // Deletes the selected contact
    const deleteGroup = (req, res) => {
        req.group.remove();
        logger('Default', `Deleted the group ${req.group.user_group}`);
        res.json(req.group);
    };
    // Gets the list of all contacts
    const getGroups = (req, res) => {
        Group.find((err, groupList) => {
            if (err) res.status(500).send(err);
            else if (groupList) res.json(groupList);
            else res.status(404).send('No Groups Available!!');
        });
    };
    // Gets the list of all contacts
    const getGroupMembers = (req, res) => {
        // req.group.group_id;
        const filteredContacts = [];
        Contact.find((err, contactList) => {
            if (err) res.status(500).send(err);
            else if (contactList) {
                contactList.forEach((singleContact) => {
                    console.log(singleContact);
                });
                res.json(contactList);
            } else res.status(404).send('No Members Available!!');
        });
    };
    // Returning the functions
    return {
        getCounterValue,
        postCounterValue,
        getById,
        addGroup,
        updateGroup,
        deleteGroup,
        getGroups,
        getGroupMembers,
    };
};

module.exports = groupController;
