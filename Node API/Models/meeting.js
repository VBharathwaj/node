const mongoose = require('mongoose');

const { Schema } = mongoose;

const meetingModel = new Schema({
    meeting_number: { type: Number },
    title: { type: String },
    to: { type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date, default: null },
    context: { type: String },
    city: { type: String },
    cheif_guest: { type: String, default: null },
    host: { type: String },
    address: { type: String },
    point_of_contact: { type: Number },
    status: { type: String, default: null },
    created_by: { type: String },
    created_at: { type: Date, index: { expires: 31536000 } },
});

module.exports = mongoose.model('Meeting', meetingModel);
