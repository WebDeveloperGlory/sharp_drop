const { Schema, default: mongoose } = require('mongoose');

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tradeName: { type: String, required: true },
    description: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: String, required: true },
    tradeType: {
        type: String,
        enum: [ 'sale', 'purchase' ],
        default: 'sale'
    },
    confirmed: { type: Boolean, default: false },
}, {
    timestamps: true,
});

module.exports = mongoose.model( 'Order', orderSchema );