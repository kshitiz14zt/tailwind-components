// gulpfile.js
"use strict";

const { series, parallel } = require("gulp");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
const fileInclude = require("gulp-file-include");
const terser = require("gulp-terser");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const browserSync = require("browser-sync").create();
const gulpIf = require("gulp-if");
const plumber = require("gulp-plumber");

const isProd = process.env.NODE_ENV === "production";

// Paths
const paths = {
  src: {
    html: {
      pages: "src/html/pages/**/*.html",
      components: "src/html/partials/**/*.html",
    },
    css: "src/css/main.css",
    js: "src/js/main.js",
    images: "src/images/**/*",
    fonts: "src/fonts/**/*",
  },
  dist: {
    base: "dist/",
    html: "dist/",
    css: "dist/css/",
    js: "dist/js/",
    images: "dist/images/",
    fonts: "dist/fonts/",
  },
};

// Clean dist folder
gulp.task("clean", async () => {
  const del = (await import("del")).deleteAsync;
  await del(["dist"]);
});

// HTML task
gulp.task("html", () =>
  gulp
    .src([paths.src.html.pages, "!src/html/partials/**"])
    .pipe(plumber())
    .pipe(
      fileInclude({
        prefix: "@@",
        // If your includes look like @@include('partials/header.html'), keep this:
        basepath: "src/html",
        // If you prefer relative includes per file, use: basepath: "@file",
        context: {
          siteTitle: "Tailwind Template V1.0.0",
          lang: "en",
          dir: "ltr",
        },
      })
    )
    .pipe(gulpIf(isProd, htmlmin({ collapseWhitespace: true })))
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream())
);

// Tailwind + PostCSS task
gulp.task("styles", () =>
  gulp
    .src(paths.src.css)
    .pipe(plumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(postcss()) // uses postcss.config.js
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
);

// JavaScript bundling
gulp.task("scripts", () =>
  browserify({
    entries: paths.src.js,
    debug: !isProd,
  })
    .transform("babelify", { presets: ["@babel/preset-env"] })
    .bundle()
    .on("error", function (err) {
      console.error(err.toString());
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(gulpIf(!isProd, sourcemaps.init({ loadMaps: true })))
    .pipe(gulpIf(isProd, terser()))
    .pipe(gulpIf(!isProd, sourcemaps.write(".")))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())
);

// Copy fonts
gulp.task("fonts", () =>
  gulp
    .src(paths.src.fonts, { encoding: false })
    .pipe(gulp.dest(paths.dist.fonts))
    .pipe(browserSync.stream())
);

// Images (copy in dev; optimize can be added in build if needed)
gulp.task("images", () =>
  gulp
    .src(paths.src.images, { encoding: false })
    .pipe(gulp.dest(paths.dist.images))
    .pipe(browserSync.stream())
);

// Optional: optimized images for production (uncomment in build if desired)
// gulp.task("images:opt", async () => {
//   const imagemin = (await import("gulp-imagemin")).default;
//   const mozjpeg = (await import("imagemin-mozjpeg")).default;
//   const optipng = (await import("imagemin-optipng")).default;
//   const svgo = (await import("imagemin-svgo")).default;
//   return gulp
//     .src(paths.src.images, { encoding: false })
//     .pipe(
//       imagemin([
//         mozjpeg({ quality: 75, progressive: true }),
//         optipng({ optimizationLevel: 5 }),
//         svgo(),
//       ])
//     )
//     .pipe(gulp.dest(paths.dist.images));
// });

// Cache busting (build only)
gulp.task("rev", async () => {
  const rev = (await import("gulp-rev")).default;
  return gulp
    .src(["dist/**/*.{css,js}"], { allowEmpty: true })
    .pipe(rev())
    .pipe(gulp.dest(paths.dist.base))
    .pipe(rev.manifest())
    .pipe(gulp.dest(paths.dist.base));
});

gulp.task("rev-replace", async () => {
  const revReplace = (await import("gulp-rev-replace")).default;
  return gulp
    .src("dist/**/*.html")
    .pipe(
      revReplace({
        manifest: gulp.src("dist/rev-manifest.json", { allowEmpty: true }),
      })
    )
    .pipe(gulp.dest(paths.dist.html));
});

// BrowserSync + Watchers
gulp.task("serve", () => {
  browserSync.init({
    server: { baseDir: paths.dist.base },
  });

  gulp.watch(
    [paths.src.html.pages, paths.src.html.components],
    gulp.series("html")
  );
  gulp.watch(paths.src.css, gulp.series("styles"));
  gulp.watch(paths.src.js, gulp.series("scripts"));
  gulp.watch(paths.src.images, gulp.series("images"));
  gulp.watch(paths.src.fonts, gulp.series("fonts"));
});

// Default task (dev: no rev/replace)
gulp.task(
  "default",
  series(
    "clean",
    parallel("html", "styles", "images", "scripts", "fonts"),
    "serve"
  )
);

// Build task (prod: with rev/replace; optionally swap images -> images:opt)
gulp.task(
  "build",
  series(
    "clean",
    // For optimized images in production, replace "images" with "images:opt" (and uncomment the task above)
    parallel("html", "styles", "images", "scripts", "fonts"),
    "rev",
    "rev-replace"
  )
);
