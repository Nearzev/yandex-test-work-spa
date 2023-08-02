import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarUrl: String,
}, {
    timestamps: true,
});

export default mongoose.model('User', UserSchema);