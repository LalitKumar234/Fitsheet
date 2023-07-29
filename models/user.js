const mongoose = require('mongoose');
const Product = require('./product');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: {
            validator: function (val) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(val);
            },
            message: 'Please enter a valid email'
        }
    },
    phone: {
        type: String,
        maxLength: [10, 'Your phone number cannot exceed 10 characters']
    },
    address: {
        Country: {
            type: String,
        },
        State: {
            type: String,
        },
        City: {
            type: String,
        },
        Street: {
            type: String,
        },
        Zip: {
            type: String,
        },
        Landmark: {
            type: String,
        },
    },
    role: {
        type: String,
        default: 'customer'
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],
}, { timestamps: true });

mongoose.models = {};
export default mongoose.model('User', userSchema);