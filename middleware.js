const review = require('./models/review')

module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnto = req.originalUrl
        req.flash('error', 'Please login first!')
        return res.redirect('/login')
    }

    next()
}
module.exports.isreviewauthor = async (req, res, next) => {
    const { id } = req.params
    const rev = await review.findById(id)
    if (!rev.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!')
        return res.redirect(`/reviews`)
    }
    next()
}