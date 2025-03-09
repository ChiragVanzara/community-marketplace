import mongoose, {Schema} from 'mongoose';

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    images: [{
        type: String,
        required: true // cloudinary url
    }],
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
    },
    details: [{
        type: String
    }],
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noInterested: {
        type: Number,
        default: 0
    },
    interestedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: true });

export const Product = mongoose.model('Product', productSchema);
