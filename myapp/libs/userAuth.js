var userAuth;
(function (userAuth) {
    userAuth.authorize = function (req, res, next) {
        if (!req.cookies.userId) {
            res.redirect("/signin");
        }
        else {
            next();
        }
    };
})(userAuth || (userAuth = {}));
module.exports = userAuth;
