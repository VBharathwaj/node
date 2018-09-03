const mongoose = require('mongoose');

const { Schema } = mongoose;

const counterModel = new Schema({
    counterValue: { type: String },
    created_by: { type: String },
    created_at: { type: Date, index: { expires: 31536000 } },
});

module.exports = mongoose.model('meetingCounter', counterModel);
