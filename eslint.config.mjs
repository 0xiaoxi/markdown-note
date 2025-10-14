import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh'

export default defineConfig(
  // 忽略的文件和目录
  { ignores: ['**/node_modules', '**/dist', '**/out', '**/build', '**/coverage'] },

  // TypeScript 推荐配置
  tseslint.configs.recommended,

  // React 相关配置
  eslintPluginReact.configs.flat.recommended,
  eslintPluginReact.configs.flat['jsx-runtime'],
  {
    settings: {
      react: {
        version: 'detect'
      }
    }
  },

  // React Hooks 和 Refresh 配置
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': eslintPluginReactHooks,
      'react-refresh': eslintPluginReactRefresh
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginReactRefresh.configs.vite.rules
    }
  },

  // 新增：通用代码质量规则
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      // 代码质量相关
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-alert': 'warn',

      // 变量和函数相关
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // 代码风格相关
      'camelcase': ['error', { properties: 'always' }],
      'eqeqeq': ['error', 'always'],
      'no-multi-spaces': 'error',

      // 导入/导出相关
      'no-duplicate-imports': 'error',
      'import/prefer-default-export': 'off'
    }
  },

  // 新增：TypeScript 特定规则
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-interface': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn'
    }
  },

  // 新增：React 特定规则增强
  {
    files: ['**/*.{tsx,jsx}'],
    rules: {
      'react/prop-types': 'off', // 在 TypeScript 项目中可以关闭
      'react/react-in-jsx-scope': 'off', // 使用新的 JSX 转换不需要这个
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/self-closing-comp': 'error',
      'react/hook-use-state': 'warn',
      'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],

      // 组件命名规范
      'react/function-component-definition': [
        'warn',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function'
        }
      ]
    }
  },

  // 新增：Electron 特定规则
  {
    files: ['**/electron/**', '**/*.electron.{ts,js}'],
    rules: {
      'no-console': 'off', // Electron 主进程允许 console
      '@typescript-eslint/no-var-requires': 'off' // 主进程可能需要 CommonJS
    }
  },

  // Prettier 配置（必须放在最后）
  eslintConfigPrettier
)
