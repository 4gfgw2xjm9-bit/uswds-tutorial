const uswds = require('@uswds/compile');
const fs = require('node:fs');
const { series } = require('gulp');

uswds.settings.version = 3;
uswds.paths.dist.theme = './_theme';
uswds.paths.src.projectSass = './assets/css';

const compiledCss = `${uswds.paths.dist.css}/styles.css`;

async function clearCompiledCss() {
  await fs.promises.rm(compiledCss, { force: true });
}

async function verifyCompiledCss() {
  if (!fs.existsSync(compiledCss)) {
    throw new Error(`USWDS Sass compilation did not produce ${compiledCss}`);
  }
}

exports.init = series(clearCompiledCss, uswds.init, verifyCompiledCss);
exports.compile = series(clearCompiledCss, uswds.compile, verifyCompiledCss);
exports.watch = uswds.watch;