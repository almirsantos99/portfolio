const sass = require('sass');
const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

const scssResult = sass.compile(path.join(__dirname, 'assets/styles/style.scss'));

const postcssConfig = require('./postcss.config.js');

postcss(postcssConfig.plugins)
  .process(scssResult.css, { from: undefined })
  .then((result) => {
    fs.writeFileSync(path.join(__dirname, 'dist/style.css'), result.css);
    console.log('Build complete:', result.css.length, 'bytes');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
