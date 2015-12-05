exports.authorize=function(req,res,next){
	if(!req.cookies.userId){
		res.redirect("/user/signin");
	}else{
		next();
	}
}