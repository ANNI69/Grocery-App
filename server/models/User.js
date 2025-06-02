import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isSeller: {
        type: Boolean,
        default: false,
    },
    cartItems:{
        type:Object,
        default: {}
    }
    }, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
    minimize: false, // Prevents empty objects from being removed
    });

const User = mongoose.model.user || mongoose.model('User', userSchema);
export default User;