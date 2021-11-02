const { connectDB, Review } = require("./db")

let reviews = [
    { title: "Great Review", movieTitle: "Batman II", description: "A thriller film." },
    { title: "Awesome Movie", movieTitle: "Titanic", description: "A romantic film." }
]

connectDB();

async function resetData(){
    await Review.deleteMany()
    let review = await Review.create(reviews)
    console.log({review})
    return review
}

module.exports= {
    resetData
}
