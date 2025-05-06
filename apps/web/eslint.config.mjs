import createConfig from '@hotel-booking-app/eslint-config/create-config';
import pluginRouter from '@tanstack/eslint-plugin-router';

export default createConfig({
  ignores: ['dist/**', 'public/**', 'src/components/ui/**', '**/*.gen.ts'],
  plugins: { '@tanstack/router': pluginRouter },
  rules: {
    ...pluginRouter.configs['flat/recommended'].rules,
  },
});
