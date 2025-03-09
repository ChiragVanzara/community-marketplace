import mongoose, {Schema} from 'mongoose';

const notificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String,
        enum: ['order', 'chat'],
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        default: "unread"
    }
}, { timestamps: true });

export const Notification = mongoose.model('Notification', notificationSchema);

