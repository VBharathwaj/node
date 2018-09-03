const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactModel = new Schema({
    member_number: { type: Number },
    name: { type: String },
    joining_date: { type: Date },
    mobile_number: { type: Number },
    email_id: { type: String },
    date_of_birth: { type: Date },
    profession: { type: String },
    street: { type: String },
    city: { type: String },
    district: { type: String },
    state: { type: String },
    user_group_id: { type: String, default: null },
    active_flag: { type: Boolean, default: true },
    created_by: { type: String },
    created_at: { type: Date },
});

module.exports = mongoose.model('Contacts', contactModel);
