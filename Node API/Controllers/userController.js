const moment = require('moment');

const userController = (User, Log) => {
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
    const addUser = (req, res) => {
        req.body.created_at = moment().format();
        const userDetails = new User(req.body);
        userDetails.save();
        logger('Default', `Created a new user ${req.body.user_name} : ${req.body.mobile_number} with ${req.body.role} role`);
        res.status(201).send('User Saved!');
    };
    const getUsers = (req, res) => {
        User.find((err, users) => {
            if (err) res.status(500).send(err);
            else res.json(users);
        });
    };
    const getById = (req, res, next) => {
        User.findById(req.body._id, (err, user) => {
            if (err) res.status(500).send(err);
            else if (user) {
                req.user = user;
                next();
            } else res.status(404).send('User Unavailable');
        });
    };
    const getUser = (req, res) => {
        res.json(req.user);
    };
    const updateUser = (req, res) => {
        if (req.user._id) delete (req.user._id);
        Object.keys(req.body).forEach((key) => {
            req.user[key] = req.body[key];
        });
        req.user.save();
        logger('Default', `Updated the user ${req.user.user_name} : ${req.user.mobile_number} with ${req.user.role} role`);
        res.json(req.user);
    };
    const deleteUser = (req, res) => {
        req.user.remove();
        logger('Default', `Deleted the user ${req.user.user_name} : ${req.user.mobile_number} with ${req.user.role} role`);
        res.json(req.user);
    };
    return {
        addUser,
        getUsers,
        getById,
        getUser,
        updateUser,
        deleteUser,
    };
};

module.exports = userController;
