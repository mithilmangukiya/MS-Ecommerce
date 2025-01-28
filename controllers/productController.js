const upload = require('../middleware/multer-config')
const productModel = require('../models/product-model')
const categoryModel = require('../models/Category_Model')
const FormData = require('form-data'); 
const axios = require('axios');


// Merge Product or Category



// const productAdd = async (req, res) => {
//   try {
    
//     const { name, description, price, category, stockQuantity } = req.body;

   
//     const categoryExists = await categoryModel.findById(category);
//     if (!categoryExists) {
//       return res.status(400).send('Invalid category ID. Category does not exist.');
//     }

   
//     const product = await productModel.create({
//       name,
//       description,
//       price,
//       category: categoryExists._id, 
//       stockQuantity,
//       images: req.file ? req.file.buffer : null, 

     
//     });


//     res.status(201).send(`Product added successfully: ${product}`);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('An error occurred while adding the product.');
//   }
// };





const productAdd = async (req, res) => {
  try {
    const { name, description, price, category, stockQuantity } = req.body;


    const categoryExists = await categoryModel.findById(category);
    if (!categoryExists) {
      return res.status(400).send('Invalid category ID. Category does not exist.');
    }

    let imageUrl = null;

    
    if (req.file) {
      const imgBBKey = process.env.Img_bb; 

   
      const formData = new FormData();
      formData.append('image', req.file.buffer.toString('base64')); 

      const imgBBResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${imgBBKey}`, formData, {
        headers: formData.getHeaders(), 
      });

     
      imageUrl = imgBBResponse.data.data.url;
    }

   
    const product = await productModel.create({
      name,
      description,
      price,
      category: categoryExists._id,
      stockQuantity,
      images: imageUrl,
    });

    res.status(201).send(`Product added successfully: ${JSON.stringify(product)}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('An error occurred while adding the product.');
  }
};









const productDelete =  async (req, res) => {
    try {
      const productId = req.body.id;  
  
      if (!productId) {
        return res.status(400).send('Product ID is required ❌');
      }
      const product = await productModel.findByIdAndDelete(productId); 
  
      if (product) {
        res.send(`Product DELETED✅ ${product}`);
      } else {
        res.status(404).send('Product not found ❌'); 
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Error occurred while deleting the product ❌'); 
    }
  };



// const productUpdate = async (req, res) => {
//   try {
//     const { _id, name, description, price, category, stockQuantity } = req.body;

//     if (!_id) {
//       return res.status(400).send('Product ID (_id) is required ❌');
//     }

    
//     const updateFields = {};
//     if (name) updateFields.name = name;
//     if (description) updateFields.description = description;
//     if (price) updateFields.price = price;
//     if (category) updateFields.category = category;
//     if (stockQuantity) updateFields.stockQuantity = stockQuantity;

    
//     if (req.file) {
//       updateFields.images = req.file.buffer;
//     }

   
//     const product = await productModel.findByIdAndUpdate(_id, updateFields, { new: true });

//     if (product) {
//       res.send(`Product UPDATED✅ ${product}`);
//     } else {
//       res.status(404).send('Product not found ❌');
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Error occurred while updating the product ❌');
//   }
// };

const productUpdate = async (req, res) => {
  try {
    const { _id, name, description, price, category, stockQuantity } = req.body;

    // Validate Product ID (_id)
    if (!_id) {
      return res.status(400).send('Product ID (_id) is required ❌');
    }

    // Validate Category ID if passed
    if (category) {
      const categoryExists = await categoryModel.findById(category);
      if (!categoryExists) {
        return res.status(400).send('Invalid category ID. Category does not exist ❌');
      }
    }

    // Prepare the fields to update
    const updateFields = {};

    // Only add fields that are provided
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (stockQuantity) updateFields.stockQuantity = stockQuantity;

    // Handle image upload (if available)
    if (req.file) {
      updateFields.images = req.file.buffer;
    }

    // Perform the update
    const product = await productModel.findByIdAndUpdate(_id, updateFields, { new: true });

    // Check if product is found and updated
    if (product) {
      res.send(`Product UPDATED ✅: ${product}`);
    } else {
      res.status(404).send('Product not found ❌');
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error occurred while updating the product ❌');
  }
};



// const showSingleProduct = async (req, res) => {
//   try {
//     const productId = req.body.id;

//     if (!productId) {
//       return res.status(400).send('Product ID is required ❌');
//     }

//     const product = await productModel.findById(productId);

//     if (product) {
//       res.send(product);
//     } else {
//       res.status(404).send('Product not found ❌');
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Error occurred while getting the product ❌');
//   }
// };




const showSingleProduct = async (req, res) => {
  try {
    
    const productId = req.params.id;

   
    if (!productId) {
      return res.status(400).send('Product ID is required ❌');
    }

    const product = await productModel.findById(productId);

  
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send('Product not found ❌');
    }
  } catch (error) {
    // Log and send error response
    console.log(error.message);
    res.status(500).send('Error occurred while getting the product ❌');
  }
};



// const showproduct = async (req, res) => {
//   try {
//     const products = await productModel.find();
//     res.send(products);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Error occurred while getting products ❌');
//   }
// };



const showAllproduct = async (req, res) => {
  try {
    const products = await productModel.find();  // This fetches all the products
    res.send(products);  // Sends the products as the response
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error occurred while getting products ❌');
  }
};


module.exports = {productAdd , productDelete , productUpdate, showSingleProduct , showAllproduct }