const Comment = require('../model/Comment');

module.exports = function (app, Review) {

    // INDEX
    app.get('/', (req, res) => {
        // using .lean() to get a json object (instead of a mongoose one)
        Review.find({})
            .lean()
            .then(reviews => {
                console.log({reviews})
                res.render('reviews-index', { reviews });
            })
            .catch(err => {
                console.log(err);
            })
    })

    // NEW ___FORM
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', { title: "New Review" });
    })

    // CREATE
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review)
            res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })

     // SHOW
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id)
    .lean()
    .then(review => {
      // fetch its comments
      Comment.find({ reviewId: req.params.id })
      .lean()
      .then(comments => {
        // respond with the template with both values
        console.log({comments, review})
        res.render('reviews-show', { review, comments})
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });

    // EDIT ___FORM
    app.get('/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id)
            .lean()
            .then(function (review) {
                console.log({review, id: req.params.id})
                res.render('reviews-edit', { review, title: "Edit Review" });
            })
    })

    // UPDATE
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            Comment.deleteMany({ reviewId: req.params.id }).then(()=>
                res.redirect('/')
            )
        }).catch((err) => {
            console.log(err.message);
        })
    })   


}
