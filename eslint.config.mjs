// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  features: {
    stylistic: true,
  },
}).append({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'warn',
  },
})
