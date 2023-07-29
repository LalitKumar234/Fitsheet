import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 300,
        default: Date.now()
    }
});


export default mongoose.model('Otp', otpSchema);