const plugins = [];
const vant = ['import', {
  libraryName: 'vant',
  libraryDirectory: 'es',
  style: true
}, 'vant'];
plugins.push(vant);

if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: plugins
}