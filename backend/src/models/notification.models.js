import mongoose, {Schema} from 'mongoose';

const notificationSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    accepted: {
        type: String,
        enum: ['pending', 'accepted', 'decline'],
        default: "pending"
    }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);

