#vegetables 蔬菜肉管理系统后台
> 本项目个基于Vue+mui的单页面富应用

##目录结构
<pre>
│  .gitignore          # 忽略文件,比如 node_modules
│  package.json        # 项目配置
│  README.md           # 项目说明
│  index.html          # 首页
│
├─ webpack.base.config.js         # webpack 基础配置
├─ webpack.dev.config.js          # webpack 开发配置
├─ webpack.prod.config.js         # webpack 生产配置
│
│
├─node_modules
│
├─dist                 # 打包完的文件会自动放在这里
│
└─src
    ├─ main.js         # 启动配置
    │
    ├─ router.js       # 路由配置
    │
    ├─api              # 放置与API交互js，理论上每个业务一个
    |
    ├─common           # 放置公用js
    |
    ├─entry            # 入口组件,内含路由和公共部分
    |    │
    |    └─ app.vue    # 入口组件
    |    │
    |    └─ main.js    # 启动配置
    |    │
    |    └─ router.js  # 路由配置
    |
    ├─components       # 组件
    │
    ├─views            # 视图(即路由)
    │
    ├─directives       # 自定义指令
    │
    ├─filters          # 自定义过滤器
    │
    ├─config           # 放置一些配置文件
    │
    ├─libs             # 放置一些工具函数
    │
    ├─images           # 放置图片
    │
    ├─sass             # 放置css
    │    │
    │    └─ slwy.sass  # 页面样式入口文件
    │
    ├─fonts            # 放置iconfont字体
    │
    │
    └─template         # 放置html模板,webpack依赖此文件生成所需的html
         │
         │
         └─ index.html # 默认的html模板

</pre>


##说明
目前已将css(使用@import的和.vue内style的)样式都独立抽离为main.css文件,如果想按需加载,可以将webpack.base.js内的如下代码注释
```javascript
vue: {
    loaders: {
        css: ExtractTextPlugin.extract(
            "style-loader",
            "css-loader?sourceMap",
            {
                publicPath: "../dist/"
            }
        )
    }
}

##安装
```
// 安装前请先确保已安装node和npm
// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略
npm install webpack -g
npm install webpack-dev-server -g

// 安装成功后,再安装依赖
npm install
```

##运行
####开发环境
```
// 注意首次使用需要执行下面的init命令来生成入口html文件,以后不用再执行
npm run init
npm run dev
```

####生产环境(打包)
```
npm run build
```

####访问
在浏览器地址栏输入http://127.0.0.1:8080

# vegetables
