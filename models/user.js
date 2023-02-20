import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    name: {
        type: String,
        minLength: 2
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String
    }

})

//export schema to mongoDB
export default mongoose.model("User", userSchema);
