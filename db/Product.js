const { mongoose } = require("./connectdb");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    }
});

productSchema.statics.findProducts = async (filter = {}) => {
    let docs = await Product.find(filter);
    return docs;
}

productSchema.statics.saveProduct = async (productData) => {
    let newProduct = Product(productData);
    return await newProduct.save();
}

productSchema.statics.findById = async function(productId) {
    return await this.findOne({ _id: productId });
};

let Product = mongoose.model('Product', productSchema);

// async function findProducts() {
//     let docs = await Product.find({})
//     console.log(docs);
// }

// findProducts()

async function createAndSave() {
    let doc = await Product.saveProduct({
        "name": "Lola",
        "specie": "dog",
        "race": "Chihuahua",
        "age": "1",
        "description": "black",
        "imageUrl": "Images/mascota.jpg",
        "stock": "1"
    });
    Product.findProducts();
}

// createAndSave()

Product.findProducts({name: /Librero/i})

module.exports = Product;
