//有些路由方法名不是合规的 JavaScript 变量名，此时使用括号记法，比如： app['m-search']('/', function ...


//请求加载中间件
app.all('/secret', function (req, res, next) {
    console.log('Accessing the secret section ...');
    next(); // pass control to the next handler
});

//-路由路径 -----支持正则匹配 ---  字符串匹配 ---字符串模式



//-路由句柄    可以是一个函数、一个函数数组，或者是两者混合 类似中间件

//-响应方法
// 方法	描述
res.download()	提示下载文件。
res.end()	终结响应处理流程。
res.json()	发送一个 JSON 格式的响应。
res.jsonp()	发送一个支持 JSONP 的 JSON 格式的响应。
res.redirect()	重定向请求。
res.render()	渲染视图模板。
res.send()	发送各种类型的响应。
res.sendFile	以八位字节流的形式发送文件。
res.sendStatus()	设置响应状态代码，并将其以字符串形式作为响应体的一部分发送。

//express.router 类


//2---中间件--middleware
1）应用级中间件--应用级中间件绑定到 app 对象 使用 app.use() 和 app.METHOD()， 
2)路由级中间件-路由级中间件和应用级中间件一样,只是它绑定的对象为 express.Router()。
3）错误处理中间件 ---4个参数必须全  app.use((err,req,res,next)=>{})
4）内置中间件---express.static唯一的内置中间件
5）第三方中间件---
例：cookie-parser加载用于解析 cookie 的中间件
body-parser
cookie-session




3）---内置中间件
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));


三。模版引擎
名字似乎是固定的,除了路径-----
app.set('views','./public/views');views, 放模板文件的目录
app.set('view engien','pug');view engine, 模板引擎
app.use(express.static('public')); ---用了模版引擎可以不用了？？？？

res.render('index.pug',{ pug变量值传递 }) -- 后缀名可加可不加


四。错误处理
设置环境变量 NODE_ENV 为 “production” 就可以让应用运行在生产环境模式下。

五。为express设置代理 proxy-addr实现
trust proxy变量设置 app.set()

六。数据库
----mysql 
npm i mysql --save
cosnt mysql = require('mysql');
const options = {
  host:
  user:
  password:
  database
  port
}
const connct = mysql.createConnection(options);
connection.connect();
connection.query(sql,()=>{});
connection.end();



token - jwt - 

规则 -- jsonWebToken

验证token -- passport passport-jwt

加密 bcrypt


















