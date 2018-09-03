const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupModel = new Schema({
    user_group: { type: String },
    group_id: { type: Number },
    created_by: { type: String },
    created_at: { type: Date },
});

module.exports = mongoose.model('Group', groupModel);
