module.exports = {
    user : "admin",
    password : "DorxKing",
    dbName : "MyApp",
    getUrl: function () {
        return `mongodb+srv://${this.user}:${this.password}@myapp.df5xcoh.mongodb.net/${this.dbName}`
    }
}
//?retryWrites=true&w=majority&appName=MvillaDB