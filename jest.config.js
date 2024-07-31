/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  // 配置: https://jestjs.io/zh-Hans/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
  // https://github.com/microsoft/TypeScript/issues/41882
  // https://github.com/kulshekhar/ts-jest/issues/1648

  // 测试运行环境，jsdom类浏览器环境
  testEnvironment: 'node',
  preset: 'ts-jest',

  // 指定转换器，Jest默认只支持JavaScript语法
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
      },
    ],
  },
  // 指定 rootDir 对应的路径，如果与 jest.config.js 文件所在的目录相同，则不用设置
  rootDir: './',
  // 忽略测试文件
  testPathIgnorePatterns: ['/node_modules/'],
  // 覆盖率结果输出的文件夹
  coverageDirectory: '__tests__/coverage',
  // 匹配测试文件
  testMatch: [
    // 识别全局测试文件
    '/__tests__/**/*.{tsx,ts}',
  ],
  // 是否报告每个test的执行详情
  verbose: true,

  transformIgnorePatterns: ['/node_modules/'],
};
