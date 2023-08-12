let mongoose = require('mongoose');

//create a model class for contacts list
let contactsModel = mongoose.Schema({
    Name: String,
    Number: String,
    Email: String
},
{
    collection: "contacts"
});

//export model
module.exports = mongoose.model('Contacts', contactsModel);