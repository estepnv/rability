var terser = require('rollup-plugin-terser').terser;
var resolve = require('rollup-plugin-node-resolve');
var pkg = require('./package.json');
var commonjs = require('rollup-plugin-commonjs');

var banner = '//  Rability v' + pkg.version + '\n'
  + '//  ' + pkg.repository.url + '\n'
  + '//  (c) 2018-' + new Date().getFullYear() + ' Evgeny Stepanov\n'
  + '//  Rability may be freely distributed under the MIT license.\n';

var input = 'source/index.js';

var config = {
  input: input,
  output: {
    format: 'umd',
    name: 'rability',
    banner: banner,
  },
  plugins: [
    resolve(),
    commonjs()
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    terser()
  );
}

module.exports = config;
