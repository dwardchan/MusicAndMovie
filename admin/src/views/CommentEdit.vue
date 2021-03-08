<template>
  <div>
    <h1>{{ id ? '编辑' : '新建'}}评论</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属文章">
        <el-select v-model="model.parent" >
          <el-option v-for="item in articles" 
          :key="item._id" :label="item.title" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户">
        <el-select v-model="model.users" >
          <el-option v-for="item in users" 
          :key="item._id" :label="item.username" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body" 
        useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>  
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'

export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      articles: [],
      users: []
    }
  },
  components: {
    VueEditor
  },
  methods: {
    //vue2Editor中文件上传，把图片变成服务器的url而不是base64的压缩代码。
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    
      const formData = new FormData();
      formData.append("file", file);
 
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
      
    },
    async save() { 
      if(this.id) {
        await this.$http.put(`rest/comments/${this.id}`, this.model)
      }else {
        await this.$http.post('rest/comments', this.model)
      }
      
      this.$router.push('/comments/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/comments/${this.id}`)
      this.model = res.data
    },
    async fetchArticles() {
      const res = await this.$http.get(`rest/articles`)
      this.articles = res.data
    },
    async fetchUsers() {
      const res = await this.$http.get(`rest/users`)
      this.users = res.data
    }
  },
  created() {
    this.fetchUsers()
    this.fetchArticles()
    this.id && this.fetch()
  }
}
</script>