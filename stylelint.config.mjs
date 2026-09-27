export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order'
  ],
  ignoreDisables: true,
  rules: {
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: (selector) =>
          `Класс ${selector} — в camelCase: компонент читает его как поле styles`
      }
    ],
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: [
          'after-comment',
          'after-custom-property',
          'inside-single-line-block'
        ]
      }
    ],
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['--font']
      }
    ]
  }
}
