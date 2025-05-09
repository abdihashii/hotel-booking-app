import createConfig from '@hotel-booking-app/eslint-config/create-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';

export default createConfig({
  ignores: ['dist/**', 'public/**', 'src/components/ui/**', '**/*.gen.ts'],
  plugins: {
    '@tanstack/router': pluginRouter,
    '@tanstack/query': pluginQuery,
  },
  rules: {
    ...pluginRouter.configs['flat/recommended'].rules,
    ...pluginQuery.configs['flat/recommended'].rules,
  },
});
