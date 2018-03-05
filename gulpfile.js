const gulp = require('gulp');

gulp.task('default', function() {
  gulp.run('generate-service-worker');
});

gulp.task('generate-service-worker', function(callback) {
  var swPrecache = require('sw-precache');
  var rootDir = 'public';

  swPrecache.write(
    `${rootDir}/service-worker.js`,
    {
      staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff}'],
      dynamicUrlToDependencies: {
        '/': ['views/layout.pug', 'views/index.pug'],
        '/new': ['views/layout.pug', 'views/index.pug']
      },
      stripPrefix: rootDir,
      maximumFileSizeToCacheInBytes: 3500000
    },
    callback
  );
});
