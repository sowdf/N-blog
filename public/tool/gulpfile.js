var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var minifycss = require('gulp-minify-css');
var pngquant = require('imagemin-pngquant');
var imageminJpegoptim = require('imagemin-jpegoptim');


//图片压缩任务
gulp.task('image',function(){
    gulp.src('../dev/images/**')
        .pipe(pngquant({floyd: 0.3})())
        .pipe(imageminJpegoptim({progressive: true})())
        .pipe( gulp.dest('../dist/images/') );
});




gulp.task('scss',function(){
    return gulp.src('../*.scss')
        .pipe(compass({
            css:'../css',
            sass:'../scss'
        }))
        .on('error',function(){
            console.log('error');
        })
});

gulp.task('css', function() {
    return gulp.src('../dev/css/*.css')      //压缩的文件
        .pipe(minifycss({
            advanced:false,
            //compatibility:'ie7',
            keepBreaks:false
        }))
        .pipe(gulp.dest('../release/css/'));   //输出文件夹

});
gulp.task('fresh', function () {	// 这里的watch，是自定义的，写成live或者别的也行
    livereload.listen();
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('../**/*.*', function (file) {
        livereload.changed(file.path);
    });
});
/*
 * 图片合成技术
 *
 * */

gulp.task('spritesheet', function() {
    return gulp.src('../dev/css/*.css')//比如recharge.css这个样式里面什么都不用改，是你想要合并的图就要引用这个样式。 很重要 注意(recharge.css)这个是我的项目。别傻到家抄我一样的。
        .pipe(spriter({
            // The path and file name of where we will save the sprite sheet
            'spriteSheet': '../release/images/spritesheet.png', //这是雪碧图自动合成的图。 很重要
            // Because we don't know where you will end up saving the CSS file at this point in the pipe,
            // we need a litle help identifying where it will be.
            'pathToSpriteSheetFromCSS': '../images/spritesheet.png', //这是在css引用的图片路径，很重要
            'spritesmithOptions': {
                padding : 5
            }
        }))
        .pipe(gulp.dest('../dev/css/')); //最后生成出来
});
gulp.task('auto',function(){
    gulp.watch('../scss/*.scss',['scss']);
    gulp.watch('../css/*.css',['css']);
});
