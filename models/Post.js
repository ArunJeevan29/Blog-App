import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
    },
    content:{
        type: String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    createdAt: {
        type:Date,
        default: Date.now,
    },
});

export default mongoose.model('Post',postSchema);