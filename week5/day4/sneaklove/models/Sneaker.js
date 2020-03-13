const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    image: String,
    name: String,
    ref: String,
    sizes: [Number],
    description: String,
    price: Number,
    category: [{
        type: String,
        enum: ["men", "women", "kids"]
    }],
    id_tags: [{
        type: Schema.Types.ObjectId
    }],
});

const sneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = sneakerModel;