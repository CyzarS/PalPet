function validatePetAttributes(pet) {
    const requiredAttributes = ['nombre', 'especie', 'raza', 'edad', 'descripcion', 'imagenUrl'];
    const missingAttributes = requiredAttributes.filter(attr => !(attr in pet));
  
    if (missingAttributes.length > 0) {
      return { isValid: false, missingAttributes };
    }
  
    return { isValid: true };
  }
  
  module.exports = {
    validatePetAttributes
  };