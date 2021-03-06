const mongoose = require('mongoose');

const { Schema } = mongoose;

const counterModel = new Schema({
    counterValue: { type: String },
    created_by: { type: String },
    created_at: { type: Date },
});

module.exports = mongoose.model('groupCounter', counterModel);
