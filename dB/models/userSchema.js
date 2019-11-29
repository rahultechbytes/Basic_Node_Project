const mongoose = require(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    emailId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, require: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date},
    status: String,
    phoneNo: {type:Number, required: true}
})

const users = mongoose.model('Users', userSchema);
module.exports = users;