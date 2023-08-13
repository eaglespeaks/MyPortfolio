let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//Connect to our Contacts Model
let Contacts = require('../models/contacts');

//GET Route for the Contact List page - READ Operation
module.exports.displayContactsList = async (req, res, next) => {
    try {
        let contactsList = await Contacts.find();
        
        //show the view for the contacts-list
        res.render('contacts/list', 
        { title: 'My Contact List', 
        ContactsList: contactsList,
        displayName: req.user ? req.user.displayName : '' })
    } catch (err) {
        console.log(err);
    } 
};

//GET Route for displaying the Add page - CREATE Operation
module.exports.displayAddPage = async (req, res, next) => {
    try {
        res.render('contacts/add', 
        { title: 'Add Contact', 
        displayName: req.user ? req.user.displayName : '' });
    } catch (err) {
        console.log(err);
    }
}

//POST Route for processing the Add page - CREATE Operation
module.exports.processAddPage = async (req, res, next) => {
    let newContact = new Contacts({    
        "Contact Name": req.body.name,
        "Contact Number": req.body.number,
        "Email Address": req.body.email
    });
    try {
        await newContact.save();
        res.redirect('/contact_list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//GET Route for displaying the Edit page - UPDATE Operation
module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        let contactsToEdit = await Contacts.findById(id);
        res.render('contacts/edit', 
        { title: 'Edit Contact', 
        contacts: contactsToEdit,
        displayName: req.user ? req.user.displayName : '' });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//POST Route for processing the Edit page - UPDATE Operation
module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    let updatedContacts = {
        "Contact Name": req.body.name,
        "Contact Number": req.body.number,
        "Email Address": req.body.email
    };

    try {
        await Contacts.updateOne({ _id: id }, updatedContacts);
        res.redirect('/contact_list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//GET to perform Deletion - DELETE Operation
module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contacts.findByIdAndRemove(id);
        res.redirect('/contact_list');
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};