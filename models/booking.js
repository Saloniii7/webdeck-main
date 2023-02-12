const mongoose = require('mongoose')
const schema = mongoose.Schema
const bookingschema = new schema({
    name: String,
    email: String,
    phone: Number,
    date: Date,
    person: Number,
    details: String
})

const Booking = mongoose.model('Booking', bookingschema)
module.exports = Booking;