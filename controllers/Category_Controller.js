const categoryModel=require('../models/Category_Model');
const slugify = require("slugify");


//create a category
const addCategory=async (req,res)=> {
    try {
        const { name, description } = req.body;
    
        let image = null;
        if (req.file) {
          image = `categories/${req.file.filename}`;
        }
    
        const newCategory = new categoryModel({
          name,
          slug: slugify(name, { lower: true }),
          description,
          image,
        });
    
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully.", newCategory });
      } catch (error) {
        console.error("Error while creating category:", error);
        res.status(500).json({ message: "Error creating category.", error });
      }
    };



//get all Category
const getAllCategory=async (req,res)=>{
    try{
        const allCategory=await categoryModel.find({})
        res.status(200).send({
            Category:allCategory.length,
            allCategory,
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error while getting category.." });
      }
}


//get category by id
const getCategoryById=async (req,res) =>{
    try{
        const catid=req.params.id;
        const category = await categoryModel.findById(catid);

        if (!category) {
            return res.status(404).json({
              success: false,
              message: "Category not found",
            });
        }
        res.status(200).json({
            success: true,
            data: category,
        });
      
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error while getting category.." });
    }
}


//update Category by id
const updateCategory=async (req,res)=> {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
    
        // Prepare the update object
        const updatedData = {
          ...(name && { name }),
          ...(description && { description }),
        };
    
        if (req.file) {
          updatedData.image = `categories/${req.file.filename}`; // If image is provided, update the image field
        }
    
        const category = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });
    
        if (!category) {
          return res.status(404).json({ message: "Category not found." });
        }
    
        res.status(200).json({ message: "Category updated successfully.", category });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating category.", error });
      }
}


//Delete Category By Id
const deleteCategoryById=async (req, res)=>{
    try {
      const categoryId= req.params.id;
      if (!categoryId) {
        return res.status(400).send('category ID is required ');
      }
      const deleteCategory =await categoryModel.findByIdAndDelete(id);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "error while deleting Category.." });
    }
  }


module.exports={
    addCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategoryById,
}