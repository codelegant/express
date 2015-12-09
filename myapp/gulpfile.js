"use strict";
var gulp = require("gulp"),
    tsc = require("gulp-typescript"),
    minimist=require("minimist");

var knownOptions = {
  string: 'path',
  default: { env: process.env.NODE_ENV || 'production' }
};
var options = minimist(process.argv.slice(2), knownOptions);

gulp.task("tsc",function(){
    return gulp.src("./"+options.path+"/*.ts")
    .pipe(tsc({
        "removeComments":true,
        "target":"ES5",
        "module":"commonjs"
    }))
    .pipe(gulp.dest("./"+options.path+"/"));
});
gulp.task('watch', function () {
    gulp.watch("./"+options.path+"/*.ts", ['tsc']);
});