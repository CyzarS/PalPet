const { mongoose } = require("./connectdb");
const bcrypt = require('bcryptjs');

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
    },
    isAdmin: {
        type: Boolean,
        default: true
    },
    profileImage: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg'
    },
    phone: {
        type: String,
        default: '+52:'
    },
    location: {
        type: String,
        default: ''
    },
    create: {
        type: [String], // Definir como un arreglo de strings
        default: [],
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

// Método para autenticar al usuario
userSchema.statics.authUser = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            return user;
        }
    }
    return null;
};

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