const express = require("express");
const {addCategory,getAllCategory,getCategoryById,updateCategory,deleteCategoryById}=require('../Controllers/Category_Controller')

const router=express.Router();

//get all Category||GET
router.get("/getallcat", getAllCategory);

//create Category || POST
router.post("/createcat", addCategory);

//get category By Id || GET
router.get("/getonecat/:id",getCategoryById)

//Update All Category || PUT
router.patch("/updatecat/:id", updateCategory);

//Delete Category || DELETE
router.delete("/deletecat/:id", deleteCategoryById);

module.exports = router;