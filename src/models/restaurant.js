import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    "name": {
        type: String,
        required: true,
    },
    "address": {
        type: String,
        required: true
    },
    "category": [{
        type: String,
        required: true
    }],
    "active": {
        type: Boolean,
        required: true
    }
})

RestaurantSchema.index({"active": 1, "name":1}, {"unique": true})
export default mongoose.model('Restaurant', RestaurantSchema)