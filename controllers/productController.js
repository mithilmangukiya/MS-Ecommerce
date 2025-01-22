const upload = require('../middleware/multer-config')
const productModel = require('../models/product-model')

const productAdd = async(req, res) => {

try {

    let {name , description , price , category , stockQuantity} = req.body


        const product = await productModel.create({
        name , 
        description , 
        price ,
        category ,
        stockQuantity,
        images : req.file.buffer
    })

    res.send(`Product ADDED✅ ${product}`);
     


} catch (error) {
    console.log(error.message)
}
}


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



const productUpdate = async (req, res) => {
  try {
    const { _id, name, description, price, category, stockQuantity } = req.body;

    if (!_id) {
      return res.status(400).send('Product ID (_id) is required ❌');
    }

    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (stockQuantity) updateFields.stockQuantity = stockQuantity;

    
    if (req.file) {
      updateFields.images = req.file.buffer;
    }

   
    const product = await productModel.findByIdAndUpdate(_id, updateFields, { new: true });

    if (product) {
      res.send(`Product UPDATED✅ ${product}`);
    } else {
      res.status(404).send('Product not found ❌');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error occurred while updating the product ❌');
  }
};



const showSingleProduct = async (req, res) => {
  try {
    const productId = req.body.id;

    if (!productId) {
      return res.status(400).send('Product ID is required ❌');
    }

    const product = await productModel.findById(productId);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send('Product not found ❌');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error occurred while getting the product ❌');
  }
};


const showproduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.send(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error occurred while getting products ❌');
  }
};


module.exports = {productAdd , productDelete , productUpdate, showSingleProduct ,showproduct }