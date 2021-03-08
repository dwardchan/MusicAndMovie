const { json } = require("express");
const express = require("express");
const session = require("express-session");

const app = express();

app.set("secret", "as2314da");

app.use(require("cors")());
app.use(express.json());
//托管静态文件
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  session({
    secret: "ddfdsa", //session密钥
    resave: true, //重新保存
    rolling: true, //失效时间
    cookie: { maxAge: 22000 }, //最大时效时间，单位为毫秒
    saveUninitialized: true, //保存
  })
);

require("./plugins/db")(app);
require("./routes/admin")(app);
require("./routes/web")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
