const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    user_name: { type: String },
    password: { type: String },
    mail_id: { type: String },
    mobile_number: { type: Number },
    role: { type: String },
    active_flag: { type: Boolean, default: true },
    created_by: { type: String },
    created_at: { type: Date },
});

module.exports = mongoose.model('User', userModel);
