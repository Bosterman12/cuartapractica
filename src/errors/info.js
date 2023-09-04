export const generateErrorAddProduct = (products) => {
    return `One or more propieties of the product were incomplete or invalid.
      List of propieties:
      Title: need to  by a string, received ${products.title}
      Description: need to  by a string, received ${products.description}
      Price: need to  by a number, received ${products.price}
      Code: need to by a string, received ${products.code}
      category: need to  by a string, received ${products.category}
      Stock: need to  by a number, received ${products.stock}`
  }
  
  export const generateErrorAddProductToCart = (products) => {
    return `One or more propieties  to add product to cart were incomplete or invalid.
    List of propieties:
    Product: need to  by a id from mongoDB, received ${products._id}, product not found`
  }