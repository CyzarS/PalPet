const { mongoose } = require("./connectdb");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    category: {
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
        "name": "Librero",
        "description": "Estanteria para guardar libros",
        "imageUrl": "https://res.cloudinary.com/dqoz5czqh/image/upload/v1711162707/MueblesVilla/Productos/Almacenamiento/njajp1gtyv3d33dh04rt.webp",
        "unit": "unidad",
        "stock": 10,
        "pricePerUnit": 249.99,
        "category": "Almacenamiento"
    });
    Product.findProducts();
}

// createAndSave()

Product.findProducts({name: /Librero/i})

module.exports = Product;
