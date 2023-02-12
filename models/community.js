const mongoose = require('mongoose')
const schema = mongoose.Schema
const communityschema = new schema({
    name: String,
    email: String,
    phone: String,
    dob: Date,
    country: String,
    community: String,
    education: String,
    author: {
        type: schema.Types.ObjectId,
        ref: 'User'
    }
})

const Community = mongoose.model('Communtiy', communityschema)
module.exports = Community;