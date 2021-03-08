module.exports = app => {
  const router = require("express").Router();
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");
  const mongoose = require("mongoose");
  const Category = mongoose.model("Category");
  const Article = mongoose.model("Article");
  const User = mongoose.model("User");
  const Comment = mongoose.model("Comment");

  const authMiddleware = require("../../middleware/auth");

  router.get("/movie/list", authMiddleware(User), async (req, res) => {
    const parent = await Category.findOne({
      name: "电影",
    });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "categories",
          as: "moviesList",
        },
      },
    ]);
    res.send(cats);
  });

  router.get("/music/list", authMiddleware(User), async (req, res) => {
    const parent = await Category.findOne({
      name: "音乐",
    });
    const cats = await Category.aggregate([
      { $match: { parent: parent._id } },
      {
        $lookup: {
          //这里music必须加s才能显示
          from: "musics",
          localField: "_id",
          foreignField: "categories",
          as: "musicList",
        },
      },
    ]);
    res.send(cats);
  });

  router.get("/article/list", async (req, res) => {
    const parent = await Category.findOne({
      name: "讨论",
    });
    const cats = await Article.aggregate([{ $match: { parent: parent._id } }]);
    res.send(cats);
  });

  router.get("/article/:id/comment", async (req, res) => {
    const parent = await Article.findById(req.params.id);
    const cats = await Comment.aggregate([
      { $match: { parent: parent.title } },
    ]);
    res.send(cats);
  });

  //讨论详情接口
  router.get("/article/:id", async (req, res) => {
    const data = await Article.findById(req.params.id);
    res.send(data);
  });

  //用户登录
  app.post("/web/api/login", async (req, res) => {
    //解构赋值取得客户端获取的账号密码
    const { username, password } = req.body;
    //1根据用户名找用户
    const user = await User.findOne({
      username: username,
    }).select("+password");
    //.select('+password'); 是为了在compareSync时能取到被select false的密码
    assert(user, 422, "用户不存在");

    //2校验密码
    const isValid = require("bcrypt").compareSync(password, user.password);
    assert(isValid, 422, "密码错误");

    //3返回token
    req.session.username = username;
    const UserName = req.session.username;
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({ token, UserName: UserName });
  });
  //用户注册
  router.post("/users", async (req, res) => {
    //注册前用户名是否存在检验
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username,
    });
    assert(!user, 422, "用户名已存在");
    if (!user) {
      const model = await User.create(req.body);
      res.send(model);
    }
  });
  //用户新增评论
  router.post("/comments", async (req, res) => {
    const model = await Comment.create(req.body);
    res.send(model);
  });
  //用户删除评论
  router.delete("/comments/:id", async (req, res) => {
    await Comment.findByIdAndDelete(req.params.id, req.body);
    res.send({
      success: true,
    });
  });
  //用户信息接口
  router.get("/user", async (req, res) => {
    const model = await User.findOne({
      username: username,
    });
    res.send(model);
  });

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message,
    });
  });

  app.use("/web/api", router);
};
