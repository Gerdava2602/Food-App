import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    restaurant : {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    customer : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        type : Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],
    status: {
        type: String,
        required: true
    },
    deliver : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    active : {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('Order', OrderSchema)