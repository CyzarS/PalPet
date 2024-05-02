const { mongoose } = require("./connectdb");

const petSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    especie: {
        type: String,
        required: true
    },
    raza: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagenUrl: {
        type: String,
        required: true
    },
    available: {
        type: Number,
        required: true
    }
});

petSchema.statics.findPets = async (filter = {}) => {
    let docs = await Pet.find(filter);
    console.log(docs);
    return docs;
}

petSchema.statics.savePet = async (petData) => {
    let newPet = Pet(petData);
    return await newPet.save();
}

petSchema.statics.findById = async function(petId) {
    return await this.findOne({ _id: petId });
};

let Pet = mongoose.model('Pet', petSchema);

async function createAndSave() {
    let doc = await Pet.savePet({
        "nombre": "Lola",
        "especie": "perro",
        "raza": "Labrador",
        "edad": "1",
        "descripcion": "golden",
        "imageUrl": "http://www.imagenLola.com/images/",
        "available":  1
    });
    Pet.findPets();
}

// createAndSave()

Pet.findPets({name: /Librero/i})

module.exports = Pet;

