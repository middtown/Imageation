const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PhotoSchema = new Schema({
    title: String,
    name: String,
    url: String
});
var Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;