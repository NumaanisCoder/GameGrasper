const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema =new Schema({
    username:{
        type: String,
        required: [true, 'username is required']
    },
    avatar:{
        type: String
    },
    email:{
        type: String,
        required:[true,'user email is required']
    },
    otp: {
        type: Number
    },
    password:{
        type:String,
        required: [true, 'password required']
    },
    verify: {
        type: Boolean,
        default: false
    }
    
})

export const user = mongoose.models.user || mongoose.model('user',userSchema);
 