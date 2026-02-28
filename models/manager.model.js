import mongoose from "mongoose";

const managerSchema = new mongoose.Schema({
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

const ManagerModel = mongoose.model('managerModel',managerSchema);

export default ManagerModel;