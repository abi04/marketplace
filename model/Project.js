var mongoose = require("mongoose");
var validator = require('validator');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var ProjectSchema = new Schema({

    description: {
        type: String,
        required: true
    },

    maxBudget: {
        type: Number,
        required: true
    },

    lastTime: {
        type: String,
        validate: {
            validator: function (v) {
                return validator.isAfter(v);
            },
            message: '{VALUE} is not a valid future date!'
        },
        required: true

    },

    lowestBid: {
        type: Number,
        min: 0,
        validate: {
            validator: function (v) {
                return v != null;
            },
            message: 'Bid cannot be null'
        },

        require:true
    },

    lowestBuyer: {
        type: String,
        validate: {
            validator: function (v) {
                return v != null && v != ' ' && v != '';
            },
            message: 'Buyer name cannot be null'
        },

        require:true
    },

    status: {
        type: Boolean,
        required: true
    }
});


autoIncrement.initialize(mongoose.connection);

//TO increment projectID by 1 instead of using ObjectID
ProjectSchema.plugin(autoIncrement.plugin, 'Project');
var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;
