const categoryModel=require('../models/Category_Model');
const slugify = require("slugify");


//create a category
const addCategory=async (req,res)=> {
    try{
        const body=req.body;
        
        await categoryModel.create({
            name:body.name,
            slug: slugify(body.name , { lower: true }),
            description:body.description,
            image:body.image,
        })
        res.status(201).json({ message: "Category Created Successfully.." });
    }   
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error occured.." ,error});
      }
}


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
    try{
        const {id}=req.params;
        // if (!ObjectId.isValid(id)) {
        //     return res.status(400).json({ message: "Invalid category ID format" });
        // }
        const updatedCategory =await categoryModel.findByIdAndUpdate(id, req.body, {new: true});
        const cleanUpdatedCategory=JSON.parse(JSON.stringify(updatedCategory,(key,value)=>{
            if (key === 'client' || key === 'sessionPool') {
                return undefined; 
            }
            return value;
        }))
        res.status(200).json(cleanUpdatedCategory);

    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "error while updating Category.." });
      }
}


//Delete Category By Id
const deleteCategoryById=async (req, res)=>{
    try {
      const {id }= req.params;
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