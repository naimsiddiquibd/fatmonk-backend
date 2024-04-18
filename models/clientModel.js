const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    logo: {
        filename: String, // Add a field to store the filename
        contentType: String,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Client", clientSchema);
