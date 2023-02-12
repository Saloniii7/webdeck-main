if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}
const express = require('express')
const app = express()
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
const methodoverride = require('method-override')
app.use(methodoverride('_method'))
const ejsmate = require('ejs-mate')
app.engine('ejs', ejsmate)
app.use(express.static(path.join(__dirname, 'public')))
const gourfood = require('./models/gourfood')
const review = require('./models/review')
const booking = require('./models/booking')
const community = require('./models/community')
const user = require('./models/users')
const mongoose = require('mongoose')
const passport = require('passport')
const localstrategy = require('passport-local')
const { isloggedin, isreviewauthor } = require('./middleware')

const dburl = process.env.DB_url || 'mongodb://127.0.0.1:27017/restaurant'
//'mongodb://127.0.0.1:27017/restaurant'
mongoose.connect(dburl)
    .then(() => {
        console.log('connection secured')
    })
    .catch((err) => {
        console.log('eroorrrrrrrrrrrr')
        console.log(err)
    })

const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo');
const store = new MongoStore({
    mongoUrl: dburl,
    secret: 'thisshouldbeasecret',
    touchAfter: 24 * 60 * 60
})

store.on('error', (e) => {
    console.log('session store error', e)
})
const sessionconfig = {
    store,
    secret: 'thisshouldbeasecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionconfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localstrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req, res, next) => {
    res.locals.curruser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.get('/', (req, res) => {
    res.render('landingpage')
})
app.get('/profile', isloggedin, async (req, res) => {
    const comm = await community.find({});
    res.render('newHome', { comm })
})
app.get('/community', isloggedin, async (req, res) => {
    res.render('community')
})
app.post('/community', isloggedin, async (req, res) => {
    const comm = new community(req.body);
    comm.author = req.user._id;
    await comm.save();
    req.flash('success', 'Successfully Joined Us!')
    res.redirect('/profile')
})
app.get('/reviews', async (req, res) => {
    const rev = await review.find({}).populate('author')
    res.render('reviews', { rev })
})
app.post('/reviews', isloggedin, async (req, res) => {
    const rev = new review(req.body)
    rev.author = req.user._id
    await rev.save()
    req.flash('success', 'Successfully added a review!')
    res.redirect('/reviews')
})
app.get('/support', isloggedin, (req, res) => {
    res.render('mentor')
})
app.get('/mentorlist', (req, res) => {
    res.render('mentorlist')
})

app.get('/jobs', isloggedin, (req, res) => {
    res.render('jobPage1')
})
app.get('/savedjobs', isloggedin, (req, res) => {
    res.render('savedJob')
})
app.get('/desc', (req, res) => {
    res.render('wipro')
})
app.get('/education', isloggedin, (req, res) => {
    res.render('courses')
})
app.delete('/reviews/:id', isreviewauthor, async (req, res) => {
    const { id } = req.params
    await review.findByIdAndDelete(id)
    req.flash('success', 'Successfully deleted a review!')
    res.redirect(`/reviews`)
})
app.get('/register', (req, res) => {
    res.render('users/register')
})

app.post('/register', async (req, res) => {
    const { email, username, password } = req.body
    const use = new user({ email, username })
    const reguser = await user.register(use, password)
    req.login(reguser, err => {
        if (err) { return next(err) }
        res.redirect('/community')
    })
})

app.get('/login', (req, res) => {
    res.render('users/login')
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', keepSessionInfo: true }), (req, res) => {
    const redirecturl = req.session.returnto || '/profile'
    delete req.session.returnto;
    res.redirect(redirecturl)
})

app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }

        res.redirect('/');
    });
});
const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
    console.log('listening on port 8000')
})