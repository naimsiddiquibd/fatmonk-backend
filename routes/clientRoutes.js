const express = require('express');
const { getClients, createClient, getClient, updateClient, deleteClient } = require('../controllers/clientsController');
const upload = require('../middleware/upload');


const router = express.Router();

router.route('/')
    .get(getClients)
    .post(upload.single('logo'), createClient); // Using Multer middleware for file upload

router.route('/:id')
    .get(getClient)
    .put(upload.single('logo'), updateClient) // Using Multer middleware for file upload
    .delete(deleteClient);


module.exports = router;
