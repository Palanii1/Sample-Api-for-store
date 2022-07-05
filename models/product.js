//Schema is used to set a general format for same objects that will be repeated multiple times. For example, here we are listing multiple products for sale, therefore we create a general product schema which every product we included in our list will follow.

const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name must be provided']
    },
    price:{
        type:Number,
        required:[true,'product price must be provided']
    },
    featured:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default: 4.5,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    company:{
        type:String,
        enum: {
            values: ['ikea','liddy','caressa','marcos'],
            message: '{VALUE} is not supported',
        }
        //enum:['ikea','liddy','caressa','marcos'],
    },
})


module.exports = mongoose.model('Product', productSchema)