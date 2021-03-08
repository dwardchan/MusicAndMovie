<template>
  <div class="page-login">
    <div class="login">
      <form >
        <h1>登录您的账号</h1>
        <div class="username">
          <label for="Username">用户名</label>
          <div class="input">
            <input id="Username" v-model="model.username">
          </div>
        </div>
        <div class="password">
          <label for="Password">密码</label>
          <div class="input">
            <input type="password" id="Password" v-model="model.password">
          </div>
        </div>
        <div class="btn">
          <button type="submit" @click="login">登录</button>
        </div>
        <router-link
        tag="div"
        :to="`/login/register`" 
        class="Register"
        ><span>注册</span></router-link>
        <div class="tip">
          <span >{{this.$store.state.LoginMessage}}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      model: {},
    }
  },
  created() {
    this.$store.state.LoginMessage = ''
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.model)
      localStorage.token = res.data.token
      sessionStorage.username = res.data.UserName //将登陆后session中用户名的值存入sessionStorage
      this.$router.push('/')
      this.$store.state.LoginMessage = ""//登录成功后将store中LoginMessage状态清空
    }
  },
  
} 
</script>

<style >
.page-login{
  width: 100%;
  height: 100vh;
  background-color: #000;
}
.login{
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.login>form>h1{
  font-size: 50px;
  letter-spacing: 0px;
  line-height: 50px;
  color: rgb(242, 242, 242);
  font-weight: 400;
}
label {
  display: inline-block;
  font-size: 12px;
  color: white;
  margin-bottom: 5px;
}
.input{
  height: 40px;
  border-radius: 20px;
  padding: 0 20px;
  background-color: rgb(21, 21, 21);
  overflow: hidden;
}
.input>input{
  border: 1px solid transparent;
  width: 100%;
  height: 40px;
  color: rgb(170, 170, 170);
  background-color: rgb(21, 21, 21);
}
.password{
  margin-top: 40px;
  width: 300px;
}
.username{
  width: 300px;
}
.btn{
  padding-top: 30px;
  display: inline-block;
}
.btn>button{
  color: white;
  background-color: #ff4848;
  height: 40px;
  width: 80px;
  border-radius: 20px;
  border: 1px solid transparent;
}
.btn>button:hover{
  background-color: #ddd;
  color: #000;
  cursor: pointer;
}
.Register{
 display: inline-block;
 padding: 10px 20px;
}
.Register>span{
  color: white;
}
.tip{
  padding-top: 6px;
  color: red;
  font-size: 12px;
}
</style>