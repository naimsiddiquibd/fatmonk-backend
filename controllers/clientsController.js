// clientController.js

const asyncHandler = require("express-async-handler");
const Client = require("../models/clientModel");

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Description: Get the all clients
//Route: GET /api/clients
//Access: public
const getClients = asyncHandler (async (req, res) => {
    const client = await Client.find();
    res.status(200).json(client);
})

//Description: Create a new client
//Route: POST /api/clients
//Access: public
const createClient = asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name || !req.file) {
        res.status(400);
        throw new Error("Name and logo are required fields!");
    }

    const { originalname, mimetype } = req.file; // Get original filename and mimetype
    const client = await Client.create({
        name,
        logo: {
            filename: originalname, // Save filename along with other data
            contentType: mimetype // Save content type
        }
    });
    res.status(201).json(client);
});


//Description: Get an individual client
//Route: GET /api/clients/:id
//Access: public
const getClient = asyncHandler (async (req, res) => {
    const client = await Client.findById(req.params.id);
    if(!client){
        res.status(404);
        throw new Error("Contact not found!")
    }
    res.status(200).json(client);
})

//Description: Update an individual client
//Route: PUT /api/clients/:id
//Access: public
const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        res.status(404);
        throw new Error("Client not found!");
    }

    // Update other fields (e.g., name)
    client.name = req.body.name;

    // Update logo if a new file is uploaded
    if (req.file) {
        client.logo.filename = req.file.originalname;
        client.logo.contentType = req.file.mimetype;
    }

    // Save the updated client
    await client.save();

    res.status(200).json(client);
});

//Description: Update an individual client
//Route: PUT /api/clients/:id
//Access: public
const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json(client);
});

module.exports = {getClients, createClient, getClient, updateClient, deleteClient};