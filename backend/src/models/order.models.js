import { Schema, model } from "mongoose";

const orderSchema = new Schema({
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
    status: {
        type: String,
        enum: ['pending', 'accepted', 'decline'],
        default: "pending"
    }
}, {timestamps: true});

export const Order = model("Order", orderSchema);