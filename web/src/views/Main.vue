<template>
  <div>
    <div class="nav">
      <div class="content">
        <div class="c-left">
          <a href=""><div class="zhuye"><i class="iconfont icon-zhuye"></i></div></a>
          <a href=""><div class="menu-selection"><span>音乐</span></div></a>
          <a href=""><div class="menu-selection"><span>电影</span></div></a>
          <a href=""><div class="sousuo"><i class="iconfont icon-sousuo"></i></div></a>
        </div>
        <div class="c-right"> 
          <a href=""><div class="menu-selection"><i class="iconfont icon-zhanghao"></i><span>{{username}}</span></div></a>
          <a href=""><div class="menu-selection ziyuan"><i class="iconfont icon-ziyuan"></i></div></a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = sessionStorage.username
  },
  
  
}
</script>

<style scoped>

.nav{
  height: 60px;
  background-color: #000;
}
.content{
  height: 60px;
  margin: 0 250px;
  padding: 5px 0;
  display: flex;
  color: white;
  align-items: center;
}
.c-left{
  flex: 1;
  display: flex;
  align-items: center;
}
.c-left .a{
  color: white;
}
.c-right{
  display: flex;
  align-items: center;
}
.iconfont{
  color: white;
}
.icon-zhuye {
  font-size: 36px;
}
.icon-zhanghao{
  margin-right: 5px;
}
.icon-ziyuan{
  margin-left: 5px;
  font-size: 20px;
}
.ziyuan {
  margin-top: 4px;
}
.zhuye {
  margin-bottom: 5px;
}
.sousuo{
  padding-left: 36px;
  margin-top: 5px;
}
.menu-selection{
  padding-left: 32px;
}


</style>
