import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
    },
    cellphone : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    },
    active : {
        type: Boolean,
        required: true
    },
});

UserSchema.index({"active": 1, "email":1}, {"unique": true})

export default mongoose.model('User', UserSchema);