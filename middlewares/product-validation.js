function validateProductAttributes(product) {
  const requiredAttributes = ['name', 'species', 'breed', 'age', 'imageUrl', 'stock', 'description', 'userId'];
    const missingAttributes = requiredAttributes.filter(attr => !(attr in product));
  
    if (missingAttributes.length > 0) {
      return { isValid: false, missingAttributes };
    }
  
    return { isValid: true };
  }
  
  module.exports = {
    validateProductAttributes
  };