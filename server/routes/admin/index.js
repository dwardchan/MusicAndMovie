module.exports = app => {
  const express = require("express");
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const AdminUser = require("../../models/AdminUser");

  const authMiddleware = require("../../middleware/auth");
  const router = express.Router({
    mergeParams: true,
  });

  //新增
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body);
    res.send(model);
  });
  //修改
  router.put("/:id", async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    res.send(model);
  });
  //删除
  router.delete("/:id", async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });

  //资源列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Category") {
      queryOptions.populate = "parent";
    }
    //关联上级分类，将parent以对象展示
    const items = await req.Model.find().setOptions(queryOptions).limit(100);
    res.send(items);
  });

  //资源详情
  router.get("/:id", async (req, res) => {
    const model = await req.Model.findById(req.params.id);
    res.send(model);
  });
  //:resource动态接口名
  app.use(
    "/admin/api/rest/:resource",
    authMiddleware(AdminUser), //登录校验中间件
    async (req, res, next) => {
      const modelName = require("inflection").classify(req.params.resource);
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    //挂在路由
    router
  );

  //multer node中用于上传的中间件
  const multer = require("multer");
  const upload = multer({ dest: __dirname + "/../../uploads" });
  app.post(
    "/admin/api/upload",
    authMiddleware(AdminUser),
    upload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3000/uploads/${file.filename}`;
      res.send(file);
    }
  );

  app.post("/admin/api/login", async (req, res) => {
    //解构赋值取得客户端获取的账号密码
    const { username, password } = req.body;
    //1根据用户名找用户
    const user = await AdminUser.findOne({
      username: username,
    }).select("+password");
    //.select('+password'); 是为了在compareSync时能取到被select false的密码
    assert(user, 422, "用户不存在");

    //2校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    //3返回token

    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token });
  });

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });
};
