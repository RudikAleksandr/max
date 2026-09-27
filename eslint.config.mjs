import js from '@eslint/js'
import react from '@eslint-react/eslint-plugin'
import stylistic from '@stylistic/eslint-plugin'
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import boundaries from 'eslint-plugin-boundaries'
import checkFile from 'eslint-plugin-check-file'
import { importX } from 'eslint-plugin-import-x'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'

const CODE_RESTRICTIONS = [
  {
    selector: 'JSXAttribute > JSXExpressionContainer > :function',
    message:
      'Обработчик — функция компонента (handleX), а не стрелка в разметке'
  },
  {
    selector:
      'JSXExpressionContainer > ConditionalExpression:not([consequent.type=/^JSX/][alternate.type=/^JSX/])',
    message:
      'Значение — в переменную перед return: тернарник в разметке выбирает только между элементами'
  },
  {
    selector:
      ':matches(IfStatement, ConditionalExpression) > LogicalExpression.test',
    message:
      'Составное условие — переменная с именем, а два разных смысла — два ранних выхода'
  },
  {
    selector: ':matches(IfStatement, ConditionalExpression) > .test :function',
    message: 'Колбэк в условии — результат в переменную с именем'
  },
  {
    selector:
      'CallExpression:not([callee.type=CallExpression]) > :matches(CallExpression, AwaitExpression, NewExpression).arguments',
    message:
      'Результат вызова — в переменную с именем, а не аргументом другого вызова'
  },
  {
    selector: 'ConditionalExpression > ObjectExpression',
    message: 'Объект в тернарнике — ранний возврат'
  },
  {
    selector:
      'CallExpression[callee.name=/^use\\w+Store$/] > :function :matches(ArrayExpression, ObjectExpression, NewExpression)',
    message:
      'Селектор zustand отдаёт значение из стора как есть: новый [], {} или new на каждом вызове зацикливает рендер — отдайте undefined, а пустое значение подставьте вне селектора'
  }
]

const MODULE_CONSTANT_RESTRICTION = {
  selector:
    ':matches(Program, Program > ExportNamedDeclaration) > VariableDeclaration > VariableDeclarator[id.name=/^[A-Z][A-Z0-9_]+$/]',
  message: 'Константа — в constants.ts своей папки'
}

export default defineConfig(
  {
    ignores: ['dist']
  },

  {
    linterOptions: {
      noInlineConfig: true
    }
  },

  js.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
      react.configs['recommended-type-checked'],
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver()]
    },
    rules: {
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false
          }
        }
      ],
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-expect-error': true
        }
      ],
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        {
          assertionStyle: 'never'
        }
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/method-signature-style': 'error',
      'import-x/no-cycle': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index']
          ],
          pathGroups: [{
            pattern: '@/**',
            group: 'internal'
          }],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          }
        }
      ]
    }
  },

  {
    files: ['**/*.tsx'],
    extends: [reactRefresh.configs.vite]
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: {}
      },
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        {
          type: 'app',
          pattern: 'src/app'
        },
        {
          type: 'page',
          pattern: 'src/pages/*',
          capture: ['name']
        },
        {
          type: 'module',
          pattern: 'src/modules/*',
          capture: ['name']
        },
        {
          type: 'api',
          pattern: 'src/shared/api/*',
          capture: ['name']
        },
        {
          type: 'shared',
          pattern: 'src/shared'
        }
      ],
      'boundaries/files': [{
        pattern: 'src/main.tsx',
        category: 'root'
      }]
    },
    rules: {
      'boundaries/no-unknown-files': 'error',
      'boundaries/no-unknown-dependencies': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkInternals: true,
          policies: [
            {
              from: {
                file: {
                  categories: 'root'
                }
              },
              allow: {
                to: {
                  element: {
                    type: 'app'
                  }
                }
              }
            },
            {
              from: {
                element: {
                  type: 'app'
                }
              },
              allow: {
                to: [
                  {
                    element: {
                      type: ['app', 'shared']
                    }
                  },
                  {
                    element: {
                      type: ['page', 'module', 'api'],
                      fileInternalPath: 'index.ts'
                    }
                  }
                ]
              }
            },
            {
              from: {
                element: {
                  type: 'page'
                }
              },
              allow: {
                to: [
                  {
                    element: {
                      type: 'shared'
                    }
                  },
                  {
                    element: {
                      type: 'module',
                      fileInternalPath: 'index.ts'
                    }
                  },
                  {
                    element: {
                      type: 'page',
                      captured: {
                        name: '{{from.element.captured.name}}'
                      }
                    }
                  }
                ]
              }
            },
            {
              from: {
                element: {
                  type: 'shared'
                }
              },
              allow: {
                to: {
                  element: {
                    type: 'shared'
                  }
                }
              }
            },
            {
              from: {
                element: {
                  type: 'api'
                }
              },
              allow: {
                to: [
                  {
                    element: {
                      type: 'api',
                      captured: {
                        name: '{{from.element.captured.name}}'
                      }
                    }
                  },
                  {
                    element: {
                      type: 'api',
                      captured: {
                        name: 'http'
                      },
                      fileInternalPath: 'index.ts'
                    }
                  },
                  {
                    element: {
                      type: 'shared',
                      fileInternalPath: 'lib/**'
                    }
                  }
                ]
              }
            },
            {
              from: {
                element: {
                  type: 'module'
                }
              },
              allow: {
                to: [
                  {
                    element: {
                      type: 'shared'
                    }
                  },
                  {
                    element: {
                      type: 'api',
                      fileInternalPath: 'index.ts'
                    }
                  },
                  {
                    element: {
                      type: 'module',
                      captured: {
                        name: '{{from.element.captured.name}}'
                      }
                    }
                  }
                ]
              }
            },
            {
              from: {
                element: {
                  type: 'module',
                  captured: {
                    name: 'chats'
                  }
                }
              },
              allow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: 'auth'
                    },
                    fileInternalPath: 'index.ts'
                  }
                }
              }
            },
            {
              from: {
                element: {
                  type: 'module',
                  captured: {
                    name: 'messages'
                  }
                }
              },
              allow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: ['auth', 'chats']
                    },
                    fileInternalPath: 'index.ts'
                  }
                }
              }
            },

            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'ui/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: 'api/**'
                  }
                }
              },
              message:
                'Компоненты не вызывают запросы напрямую — только через хуки hooks/'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'hooks/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: 'ui/**'
                  }
                }
              },
              message: 'hooks/ не зависят от компонентов (ui/)'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'api/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: ['hooks/**', 'lib/**', 'ui/**']
                  }
                }
              },
              message:
                'api/ — запросы к GREEN-API и разбор ответов: хуки, компоненты и lib/ им не нужны'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'api/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: 'model/**'
                  }
                },
                dependency: {
                  kind: 'value'
                }
              },
              message:
                'api/ берёт из model/ только типы: запрос не пишет в стор и не применяет правила'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'model/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: ['api/**', 'hooks/**', 'ui/**']
                  }
                }
              },
              message:
                'model/ — бизнес-логика, она не зависит от запросов (api/), хуков (hooks/) и компонентов (ui/)'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'model/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '!{{from.element.captured.name}}'
                    }
                  }
                },
                dependency: {
                  kind: 'value'
                }
              },
              message:
                'model/ берёт из других модулей только типы: сценарий, который меняет чужой модуль, — в hooks/'
            },
            {
              from: {
                element: {
                  type: 'module',
                  fileInternalPath: 'lib/**'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'module',
                    captured: {
                      name: '{{from.element.captured.name}}'
                    },
                    fileInternalPath: [
                      'api/**',
                      'hooks/**',
                      'model/**',
                      'ui/**'
                    ]
                  }
                }
              },
              message:
                'lib/ — чистые функции, они не зависят от других слоёв модуля'
            },
            {
              from: [
                {
                  element: {
                    type: 'module',
                    fileInternalPath: 'ui/**'
                  }
                },
                {
                  element: {
                    type: 'page'
                  }
                },
                {
                  element: {
                    type: 'shared',
                    fileInternalPath: 'ui/**'
                  }
                }
              ],
              disallow: {
                to: {
                  element: {
                    type: 'api'
                  }
                }
              },
              message:
                'Компоненты не работают с HTTP: запросы, разбор ответов и тексты ошибок — в hooks/ модуля'
            },
            {
              from: [
                {
                  element: {
                    type: 'module',
                    fileInternalPath: [
                      'api/**',
                      'hooks/**',
                      'model/**',
                      'lib/**'
                    ]
                  }
                },
                {
                  element: {
                    type: 'api'
                  }
                },
                {
                  element: {
                    type: 'shared',
                    fileInternalPath: 'hooks/**'
                  }
                }
              ],
              disallow: {
                to: {
                  element: {
                    type: 'shared',
                    fileInternalPath: ['ui/**', 'assets/**', 'styles/**']
                  }
                }
              },
              message: 'Логика и запросы не зависят от представления'
            },
            {
              from: {
                element: {
                  type: 'module'
                }
              },
              disallow: {
                to: {
                  element: {
                    type: 'shared',
                    fileInternalPath: 'config/**'
                  }
                }
              },
              message:
                'Модули не знают маршрутов: переходы делает страница через колбэки'
            },
            {
              from: {
                element: {
                  type: 'shared',
                  fileInternalPath: 'lib/**'
                }
              },
              disallow: {
                to: [
                  {
                    element: {
                      type: 'api'
                    }
                  },
                  {
                    element: {
                      type: 'shared',
                      fileInternalPath: [
                        'hooks/**',
                        'ui/**',
                        'assets/**',
                        'styles/**'
                      ]
                    }
                  }
                ]
              },
              message:
                'shared/lib — внутренние библиотеки без привязки к API, хукам и интерфейсу: чистые функции и обёртки над сторонними библиотеками'
            }
          ]
        }
      ]
    }
  },

  {
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/**/*.d.ts', 'src/main.tsx'],
    plugins: {
      'check-file': checkFile
    },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/**/*.ts': 'CAMEL_CASE',
          'src/**/*.tsx': 'PASCAL_CASE',
          'src/modules/*/model/*.ts': '@(index)',
          'src/modules/*/model/*/*.ts':
            '@(index|types|constants|store|updaters|selectors|actions|schema|helpers)',
          'src/modules/*/hooks/*.ts': '@(index|constants|use[A-Z]*)',
          'src/modules/*/hooks/*/*.ts':
            '@(index|constants|helpers|types|use[A-Z]*)',
          'src/modules/*/hooks/*/use*.ts': '<1>',
          'src/shared/hooks/*.ts': '@(index|use[A-Z]*)',
          'src/modules/*/api/*.ts': '@(index)',
          'src/modules/*/api/*/*.ts':
            '@(index|constants|requests|helpers|types)',
          'src/shared/api/*.ts': '@(index)',
          'src/shared/api/http/*.ts': '@(index|constants|errors|query)',
          'src/shared/api/!(http)/*.ts': '@(index)',
          'src/shared/api/*/client/*.ts':
            '@(index|constants|http|requests|errors|helpers|types)',
          'src/shared/api/*/!(client)/*.ts':
            '@(index|constants|requests|helpers|types)'
        }
      ],
      'check-file/filename-blocklist': [
        'error',
        {
          'src/app/declarations/*.{ts,tsx}': '*.d.ts'
        }
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          'hooks/*/': 'use[A-Z]*'
        }
      ]
    }
  },

  {
    files: ['src/**/*.d.ts'],
    plugins: {
      'check-file': checkFile
    },
    rules: {
      'check-file/folder-match-with-fex': [
        'error',
        {
          '*.d.ts': 'src/app/@(declarations)/'
        }
      ],
      'check-file/filename-naming-convention': [
        'error',
        {
          'src/app/declarations/*.d.ts': 'KEBAB_CASE'
        },
        {
          ignoreMiddleExtensions: true
        }
      ]
    }
  },

  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-magic-numbers': [
        'error',
        {
          ignore: [0, 1, -1],
          ignoreArrayIndexes: true,
          ignoreDefaultValues: true,
          ignoreEnums: true,
          ignoreNumericLiteralTypes: true,
          ignoreReadonlyClassProperties: true,
          ignoreTypeIndexes: true
        }
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              regex: '^\\.\\./',
              message:
                'Импорт из другой папки — через @/, относительный путь только ./'
            }
          ]
        }
      ],
      'max-depth': ['error', 2],
      'max-nested-callbacks': ['error', 3],
      '@typescript-eslint/max-params': ['error', {
        max: 2
      }],
      'max-lines': ['error', {
        max: 300
      }],
      'no-nested-ternary': 'error',
      'no-else-return': ['error', {
        allowElseIf: false
      }],
      'no-lonely-if': 'error',
      'func-style': ['error', 'declaration'],
      'prefer-arrow-callback': 'error',
      'id-denylist': ['error', 'item', 'items'],
      'no-restricted-syntax': [
        'error',
        ...CODE_RESTRICTIONS,
        MODULE_CONSTANT_RESTRICTION
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          modifiers: ['destructured'],
          format: null
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['PascalCase'],
          prefix: ['is', 'has', 'should', 'can']
        }
      ]
    }
  },

  {
    files: ['**/constants.ts', 'src/shared/config/**'],
    rules: {
      'no-restricted-syntax': ['error', ...CODE_RESTRICTIONS]
    }
  },

  {
    files: ['**/*.{ts,tsx,mjs}'],
    extends: [
      stylistic.configs.customize({
        indent: 2,
        quotes: 'single',
        semi: false,
        commaDangle: 'never',
        braceStyle: '1tbs',
        arrowParens: true,
        quoteProps: 'as-needed',
        jsx: true,
        experimental: true
      })
    ],
    rules: {
      '@stylistic/exp-list-style': [
        'error',
        {
          overrides: {
            '{}': {
              singleLine: {
                spacing: 'always'
              }
            },
            ImportDeclaration: {
              singleLine: {
                maxItems: 1
              }
            },
            ExportNamedDeclaration: {
              singleLine: {
                maxItems: 1
              }
            }
          }
        }
      ],
      '@stylistic/jsx-one-expression-per-line': ['error', {
        allow: 'literal'
      }],
      '@stylistic/multiline-ternary': ['error', 'always-multiline', {
        ignoreJSX: true
      }],
      '@stylistic/operator-linebreak': [
        'error',
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
            '|': 'before'
          }
        }
      ],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: 'always'
        }
      ],
      '@stylistic/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'none'
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }
      ],
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'return',
            'const',
            'let',
            'multiline-block-like',
            'multiline-expression'
          ]
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'multiline-block-like', 'multiline-expression'],
          next: '*'
        },
        {
          blankLine: 'any',
          prev: ['singleline-const', 'singleline-let'],
          next: ['singleline-const', 'singleline-let']
        }
      ],
      '@stylistic/max-len': [
        'error',
        {
          code: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true
        }
      ]
    }
  }
)
