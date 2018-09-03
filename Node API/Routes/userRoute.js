const express = require('express');
const User = require('../Models/user');
const Log = require('../Models/logs');
const userController = require('../Controllers/userController')(User, Log);

const userRouter = express.Router();

const routes = () => {
    userRouter.route('/').get(userController.getUsers);
    userRouter.route('/addUser').post(userController.addUser);
    userRouter.use('/getUser', userController.getById);
    userRouter.use('/updateUser', userController.getById);
    userRouter.use('/deleteUser', userController.getById);
    userRouter.route('/getUser').post(userController.getUser);
    userRouter.route('/updateUser').patch(userController.updateUser);
    userRouter.route('/deleteUser').post(userController.deleteUser);
    return userRouter;
};

module.exports = routes;
