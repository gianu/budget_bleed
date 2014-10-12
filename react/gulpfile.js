var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('gulp-webpack');

gulp.task('dev', function() {
  return gulp.src(__dirname + '/js/application.js')
    .pipe(webpack({
      entry: __dirname + '/js/application.js',
      output: {
        filename: 'bundle.js'
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.styl', '.css', '.png']
      },
      module: {
        loaders: [
          { test: /\.js$/, loader: 'es6-loader'},
          { test: /\.jsx$/, loader: 'jsx-loader?harmony&insertPragma=React.DOM' },
          { test: /\.css$/, loader: 'style-loader!css-loader'},
          { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
          { test: /\.woff$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
          { test: /\.ttf$/, loader: 'file-loader' },
          { test: /\.eot$/, loader: 'file-loader' },
          { test: /\.svg$/, loader: 'file-loader'},
          { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png'},
          { test: /\.jpg$/, loader: 'file-loader'}
        ]
      }
    }))
    .pipe(gulp.dest(__dirname));
});


gulp.task('default', ['dev']);
