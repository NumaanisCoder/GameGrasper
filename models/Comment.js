const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    blog:{
        type: mongoose.Types.ObjectId
    }   
}) 

export const comment = mongoose.models.comment || mongoose.model('comment',commentSchema);