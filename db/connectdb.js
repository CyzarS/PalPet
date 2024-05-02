const mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.getUrl(), {
    // userNewUrlParser: true
})
.then(()=> console.log("connection established"))
.catch(e => console.log("connection error", e));

module.exports = {mongoose}