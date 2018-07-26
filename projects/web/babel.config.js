const getIgnoreOption = babelEnv => {
  const baseIgnorePaths = ['node_modules'];

  if (babelEnv === 'production') {
    return [...baseIgnorePaths, '**/*.spec.ts', '**/*.test.ts', '**/*.d.ts'];
  }

  return baseIgnorePaths;
};

module.exports = api => {
  const babelEnv = api.env();

  const debug = !!process.env.DEBUG;

  const presets = [
    [
      '@babel/preset-env',
      {
        debug,
        useBuiltIns: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    '@babel/plugin-proposal-optional-catch-binding',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    'react-hot-loader/babel',
    'babel-plugin-styled-components',
  ];

  const ignore = getIgnoreOption(babelEnv);

  return {
    presets,
    plugins,
    ignore,
  };
};
