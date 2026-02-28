import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirm_password : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        required : true
    },
    created_date : {
        type : String,
        required : true
    },
    updated_date : {
        type : String,
        required : true
    }
})

const AdminModel = mongoose.model('adminModel',adminSchema);

export default AdminModel;