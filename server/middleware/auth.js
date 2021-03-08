module.exports = options => {
  const jwt = require("jsonwebtoken");
  const assert = require("http-assert");

  return async (req, res, next) => {
    //添加中间件对请求添加token 通过jwt.verify对id赋值，在根据id验证用户是否存在
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    assert(token, 401, "请提供jwt token");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "无效的jwt token");
    req.user = await options.findById(id);
    assert(req.user, 401, "请先登录");
    await next();
  };
};
