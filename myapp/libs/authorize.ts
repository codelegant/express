
module authorize {
	export var signin = function(req, res, next) {
		if (!req.cookies.userId) {
			res.redirect("/signin");
		} else {
			next();
		}
	}
}
export=authorize;