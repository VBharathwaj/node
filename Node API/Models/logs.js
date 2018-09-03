const mongoose = require('mongoose');

const { Schema } = mongoose;

const logModel = new Schema({
    created_at: { type: Date, index: { expires: 604800 } },
    user: { type: String },
    log_data: { type: String },
});

module.exports = mongoose.model('Logs', logModel);
