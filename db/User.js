const { mongoose } = require("./connectdb");

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
})

userSchema.statics.findUsers = async (filter = {}, isAdmin = false) => {
    let proj = isAdmin? {}: {name: 1, email: 1, _id: 0};
    let docs = await User.find(filter,proj)
    console.log(docs);
    return docs;
}

userSchema.statics.saveUser = async (userData) => {
    let newUser = User(userData);
    return await newUser.save();
}

let User = mongoose.model('User', userSchema);

async function createAndSave() {
    let doc = await User.saveUser({
        "name": "esteld",
        "email": "eska@example.com",
        "password": "dsffs"
    });
    User.findUsers();
}



// User.findUsers({})

module.exports = { User }