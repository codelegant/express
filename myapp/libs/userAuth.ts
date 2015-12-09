
module userAuth {
	export var authorize = function(req, res, next) {
		if (!req.cookies.userId) {
			res.redirect("/signin");
		} else {
			next();
		}
	}
}
export=userAuth;