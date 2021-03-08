<template>
  <el-container style="height: 100vh;">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1']" unique-opened :default-active="$route.path">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">电影</template>
          <el-menu-item index="/movies/create">新建电影</el-menu-item>
          <el-menu-item index="/movies/list">电影列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">音乐</template>
          <el-menu-item index="/music/create">新建音乐</el-menu-item>
          <el-menu-item index="/music/list">音乐列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">用户</template>
          <el-menu-item index="/users/create">新建用户</el-menu-item>
          <el-menu-item index="/users/list">用户列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">讨论</template>
          <el-menu-item index="/comments/create">新建讨论</el-menu-item>
          <el-menu-item index="/comments/list">讨论列表</el-menu-item>
        </el-menu-item-group>
  
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-message"></i>运营管理</template>
        <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-message"></i>系统设置</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>陈德华课设</span>
    </el-header>
    
    <el-main>
      <!-- 同时存在两个route-view，应用路径进行区分 -->
      <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>


<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2021-01-10',
        name: '陈德华',
        address: ''
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>