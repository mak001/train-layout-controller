import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js, '@stylistic': stylistic },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node, UIkit: 'readonly' } },
    rules: {
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
      '@stylistic/arrow-spacing': ['error', { after: true, before: true }],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/comma-spacing': ['error', { after: true, before: false }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never', { enforceForClassMembers: true }],
      '@stylistic/dot-location': ['error', 'property'],
      '@stylistic/eol-last': 'error',
      '@stylistic/generator-star-spacing': ['error', { after: true, before: false }],
      '@stylistic/indent': ['error', 2, {
        ArrayExpression: 1,
        CallExpression: { arguments: 1 },
        flatTernaryExpressions: false,
        FunctionDeclaration: { body: 1, parameters: 1, returnType: 1 },
        FunctionExpression: { body: 1, parameters: 1, returnType: 1 },
        ignoreComments: false,
        ignoredNodes: [
          'TSUnionType',
          'TSIntersectionType',
        ],
        ImportDeclaration: 1,
        MemberExpression: 1,
        ObjectExpression: 1,
        offsetTernaryExpressions: true,
        outerIIFEBody: 1,
        SwitchCase: 1,
        tabLength: 2,
        VariableDeclarator: 1,
      }],
      '@stylistic/indent-binary-ops': ['error', 2],
      '@stylistic/key-spacing': ['error', { afterColon: true, beforeColon: false }],
      '@stylistic/keyword-spacing': ['error', { after: true, before: true }],
      '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      '@stylistic/max-statements-per-line': ['error', { max: 1 }],
      '@stylistic/member-delimiter-style': ['error', {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        multilineDetection: 'brackets',
        overrides: {
          interface: {
            multiline: {
              delimiter: 'none',
              requireLast: false,
            },
          },
        },
        singleline: {
          delimiter: 'comma',
        },
      }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline'],
      '@stylistic/new-parens': 'error',
      '@stylistic/no-extra-parens': ['error', 'functions'],
      '@stylistic/no-floating-decimal': 'error',
      '@stylistic/no-mixed-operators': ['error', {
        allowSamePrecedence: true,
        groups: [
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
      }],
      '@stylistic/no-mixed-spaces-and-tabs': 'error',
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
      '@stylistic/no-tabs': 'error',
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/operator-linebreak': ['error', 'before'],
      '@stylistic/padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
      '@stylistic/quote-props': ['error', 'consistent-as-needed'],
      '@stylistic/quotes': ['error', 'single', { allowTemplateLiterals: 'always', avoidEscape: false }],
      '@stylistic/rest-spread-spacing': ['error', 'never'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/semi-spacing': ['error', { after: true, before: false }],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': ['error', { anonymous: 'always', asyncArrow: 'always', named: 'never' }],
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-infix-ops': 'error',
      '@stylistic/space-unary-ops': ['error', { nonwords: false, words: true }],
      '@stylistic/spaced-comment': ['error', 'always', {
        block: {
          balanced: true,
          exceptions: ['*'],
          markers: ['!'],
        },
        line: {
          exceptions: ['/', '#'],
          markers: ['/'],
        },
      }],
      '@stylistic/template-curly-spacing': 'error',
      '@stylistic/template-tag-spacing': ['error', 'never'],
      '@stylistic/type-annotation-spacing': ['error', {}],
      '@stylistic/type-generic-spacing': 'error',
      '@stylistic/type-named-tuple-spacing': 'error',
      '@stylistic/wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],
      '@stylistic/yield-star-spacing': ['error', { after: true, before: false }],
    },
  },
  pluginVue.configs['flat/essential'],
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
]);
