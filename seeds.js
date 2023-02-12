const mongoose = require('mongoose')
const gourfood = require('./models/gourfood')
mongoose.connect('mongodb://127.0.0.1:27017/restaurant')
    .then(() => {
        console.log('connection secured')
    })
    .catch((err) => {
        console.log('eroorrrrrrrrrrrr')
        console.log(err)
    })

const cate = ['Continental', 'Asian', 'Indian']
const dbe = async () => {
    await gourfood.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const name = 'kadhai paneer'
        const price = Math.floor(Math.random() * 100) + 30
        const description = 'Made using fresh ingredients'
        const category = ['Indian']
        const f = new gourfood({
            name,
            price,
            description,
            category
        })
        await f.save()
    }
    for (let i = 0; i < 10; i++) {
        const name = 'Pancakes'
        const price = Math.floor(Math.random() * 100) + 30
        const description = 'Made using fresh ingredients'
        const category = ['Continental']
        const f = new gourfood({
            name,
            price,
            description,
            category
        })
        await f.save()
    }
    for (let i = 0; i < 10; i++) {
        const name = 'Sushi'
        const price = Math.floor(Math.random() * 100) + 30
        const description = 'Made using fresh ingredients'
        const category = ['Asian']
        const f = new gourfood({
            name,
            price,
            description,
            category
        })
        await f.save()
    }
}
dbe().then(() => {
    mongoose.connection.close()
})
