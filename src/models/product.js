import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    "name": {
        type: String,
        required: true,
    },
    "price": {
        type: Number,
        required: true
    },
    "restaurant" : {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
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


ProductSchema.index({"active": 1, "name":1, "restaurant":1}, {"unique": true, partialFilterExpression: { active: true } })
export default mongoose.model('Product', ProductSchema)