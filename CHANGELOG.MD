## S004 上传文件
- [cos jssdk文档](https://cloud.tencent.com/document/product/436/11459)
  - `yarn add cos-js-sdk-v5`  
## S003 登录页

- 使用 quasar 表单
- 引入 iconfont

## S002 配置路由

- ...

## S001 配置 [Eslint](https://eslint.vuejs.org/user-guide/#usage)&prettier

**_[refs]_**

> - [Eslint 简单使用](https://cnblogs.com/bejamin/p/14165011.html)\
> - [Set Up ESLint & Prettier In VS Code](https://dev.to/rahulshawdev/how-to-set-up-eslint-prettier-in-vs-code-1dc1)

- ① 安装 `yarn add -D eslint prettier eslint-config-prettier`
  - ?? `yarn add -D eslint prettier eslint-plugin-vue prettier-eslint eslint-config-prettier eslint-plugin-prettier`
- ② 配置 .eslintrc > extends + `prettier`
- ③ 创建 .prettierrc 增加规则
- ④ 安装 vscode 插件 _Eslint_ + _Prettier-codeformater_
- ⑤ 配置风格自动修复

```settings.json
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
```

- ⑥ 别名无法识别问题 `yarn add -D eslint-import-resolver-alias`

```.eslintrc.json
"settings": {
    "import/resolver": {
      "alias": {
        "map": [["@", "./src/"]]
      }
    }
  }
```

- ⑦ vscode 别名 Ctrl 无法跳转问题 `npx jsconfig.json`

**refs**

> https://www.cnblogs.com/chenxiaomeng/p/15466286.html

```jsconfig.json
  //TODO - js文件 import ’@/.vue' 仍存在无法跳转问题
  "baseUrl": "./",
  "paths": {
    "@/*": ["src/*"]
  }
```

## ☆ REFS:

- [音乐 APP 全栈开发](https://www.bilibili.com/video/BV1XQ4y1a7mX?spm_id_from=333.999.0.0) | https://www.bilibili.com/video/BV1XQ4y1a7mX?spm_id_from=333.999.0.0
