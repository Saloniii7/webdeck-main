const mongoose = require('mongoose')
const schema = mongoose.Schema
const menuschema = new schema({
    name: String,
    description: String,
    price: Number,
    category: {
        type: [String],
        enum: ['Continental', 'Asian', 'Indian']
    }
})

const Menu = mongoose.model('Menu', menuschema)
module.exports = Menu;