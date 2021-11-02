// import modules
const express = require('express')
const methodOverride = require('method-override');
var exphbs = require('express-handlebars');


// configure app
const app = express()
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.use(methodOverride('_method'))
app.set('view engine', 'handlebars');


// import customModules
const { connectDB } = require('./db');
const { resetData } = require('./seeder');
const reviewController = require('./controllers/review')
const commentController = require('./controllers/comment')
const Review = require('./model/Review')
const Comment = require('./model/Comment')

// set up database and routes
connectDB()
app.get('/resetData', async (req, res) => {
  res.json({ reviews: await resetData() });
})
reviewController(app, Review);
commentController(app, Comment)

// start app
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('App listening on port 3000!')
})

