const moment = require('moment');

const contactController = (Counter, Contact, Log) => {
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
        Contact.findById(req.body._id, (err, contactDetails) => {
            if (err) res.status(500).send(err);
            else if (contactDetails) {
                req.contact = contactDetails;
                next();
            } else res.status(404).send('Contact Unavailable');
        });
    };
    // Creating/Saving a new contact
    const addContact = (req, res) => {
        req.body.created_at = moment().format();
        const contactDetails = new Contact(req.body);
        contactDetails.save();
        const newCounterValue = {
            counterValue: req.body.member_number,
            created_by: req.body.created_by,
        };
        const intiationData = new Counter(newCounterValue);
        intiationData.save();
        logger('Default', `Created a new contact ${req.body.member_number} : ${req.body.name}`);
        res.status(201).send('Contact Saved!');
    };
    // Get the current contact details
    const getContact = (req, res) => {
        res.json(req.contact);
    };
    // Updates the contact details
    const updateContact = (req, res) => {
        if (req.contact._id) delete (req.contact._id);
        Object.keys(req.body).forEach((key) => {
            req.contact[key] = req.body[key];
        });
        req.contact.save();
        logger('Default', `Updated contact ${req.contact.member_number} : ${req.contact.name}`);
        res.json(req.contact);
    };
    // Deletes the selected contact
    const deleteContact = (req, res) => {
        req.contact.remove();
        logger('Default', `Deleted a contact ${req.contact.member_number} : ${req.contact.name}`);
        res.json(req.contact);
    };
    // Gets the list of all contacts
    const getContacts = (req, res) => {
        Contact.find((err, contactList) => {
            if (err) res.status(500).send(err);
            else if (contactList) res.json(contactList);
            else res.status(404).send('No Contacts Unavailable!!');
        });
    };
    // Returning the functions
    return {
        getCounterValue,
        postCounterValue,
        getById,
        getContact,
        addContact,
        updateContact,
        deleteContact,
        getContacts,
    };
};

module.exports = contactController;
