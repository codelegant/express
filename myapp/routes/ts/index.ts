/// <reference path="./../../../typings/tsd.d.ts" />
import express=require("express");
var router=express.Router();
router.get("/",(req,res,next)=>{
	res.render("index",{title:"主页",path:req.path});
});
export=router;