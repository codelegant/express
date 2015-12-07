"use strict";
var gulp = require("gulp"),
    tsc = require("gulp-typescript");
    
gulp.task("tsc-routes",function(){
    return gulp.src("./routes/ts/*.ts")
    .pipe(tsc({
        "removeComments":true,
        "target":"ES5",
        "module":"commonjs"
    }))
    .pipe(gulp.dest("./routes/"));
});
gulp.task('watch', function () {
    gulp.watch("./routes/ts/*.ts", ['tsc-routes']);
});