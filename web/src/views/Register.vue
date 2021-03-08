<template>
  <div class="page-register">
    <div class="register">
      <form >
        <h1>注册账号</h1>
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
          <button type="submit" @click="save">注册</button>
        </div>
        <div class="tip">
          <span >{{message}}</span>
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
      message: ''
    }
  },
  created() {
    
  },
  methods: {
    async save() {
      setTimeout(this.message = "该用户名已存在", 100)
      await this.$http.post('/users', this.model)
      this.$router.push('/login')
    }
  },
  
} 
</script>

<style >
.page-register{
  width: 100%;
  height: 100vh;
  background-color: #000;
}
.register{
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}
.register>form>h1{
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
.tip{
  padding-top: 6px;
  color: red;
  font-size: 12px;
}
</style>