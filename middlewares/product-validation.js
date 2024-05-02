function validateProductAttributes(product) {
    const requiredAttributes = ['name', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
    const missingAttributes = requiredAttributes.filter(attr => !(attr in product));
  
    if (missingAttributes.length > 0) {
      return { isValid: false, missingAttributes };
    }
  
    return { isValid: true };
  }
  
  module.exports = {
    validateProductAttributes
  };