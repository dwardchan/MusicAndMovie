<template>
  <div class="page-article" v-if="model">
    <div class="article-top">
      <h1><span >{{title}}</span></h1>
      <div class="answer" @click="answer()"><span>参与讨论</span></div>
    </div>
    <div class="editor" ref="editor">
      <vue-editor  v-model="model.body"
        useCustomImageHandler @image-added="handleImageAdded">
      </vue-editor>
      <div class="btn">
        <button type="submit" @click="submit">提交</button>
      </div>
    </div>
    <div class="article-middle">
      <div class="comment" v-for="(items, index) in comment" :key="index">
        <div class="comment-head"><span>用户：{{items.users}}</span></div>
        <div class="comment-body" v-html="items.body"></div>
        <div class="delete" ref="delete" 
        @click="commentDelete(items._id)" >删除</div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      title: '',
      model: {},
      comment: {},
    }
  },
  components: {
    VueEditor
  },
  created() {
    this.fetch()
    this.fetchComment()
    this.commentDelete()
  },
  mounted() {
  },
  updated() {
    this.deleteCheck()
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
    //获取文章头、用户信息用于提交评论时上传到服务器
    async fetch() {
      const res = await this.$http.get(`article/${this.id}`)
      this.title = res.data.title
      this.model.parent = this.title
      this.model.users = sessionStorage.username
    },
    //获取用户评论
    async fetchComment() {
      const res = await this.$http.get(`article/${this.id}/comment`)
      this.comment = res.data
    },
     answer() {
      this.$refs.editor.style.display = "block"
    },
    //提交评论
    async submit() {
      await this.$http.post('/comments', this.model)
      this.$refs.editor.style.display = "none"
      this.fetchComment()
    },
    //检查评论是否是自己的，是的话可删除
    deleteCheck(){
      for(let i=0;i<this.comment.length;i++) {
        if(this.comment[i].users == sessionStorage.username ){
          this.$refs.delete[i].style.display = "block" 
          //注意这里的delete[i]是个数组对象一定要加[i]
        }
      }
    },
    //删除评论
    async commentDelete(e) {
      await this.$http.delete(`comments/${e}`)
      await this.fetchComment()
    }
  }
}
</script>

<style >
.article-top{
  height: 220px;
  background-color: #151515;
}
.article-top>h1{
  display: flex;
  margin: 0 250px;
  padding-top: 110px;
}
.article-top>h1>span{
  font-size: 50px;
  letter-spacing: 0px;
  line-height: 50px;
  color: rgb(242, 242, 242);
  font-weight: 400;
}
.article-middle{
  padding-top: 50px;
  background-color: #f6f6f6;
}
.answer{
  display: flex;
  margin: 0 250px;
  margin-top: 20px;
  width: 88px;
  height: 30px;
  border: 2px solid #000;
  font-size: 16px;
  border-radius: 20px;
  background-color: #fff;
  color: #151515;
}
.answer>span{
  margin-left: 10px;
  line-height: 30px;
  font-weight: 500;
}
.answer:hover{
  cursor: pointer;
}
.editor {
  display: none;
  padding-top: 50px;
  margin: 0 250px;
}
.comment {
  position: relative;
  padding: 20px 100px;
  margin: 0 250px;
  background-color: #f6f6f6;
}
.comment-head{
  height: 50px;
  border: 1px solid #f6f6f6;
  background-color: #fff;
}
.comment-head>span{
  line-height: 50px;
  font-size: 20px;
  font-weight: 400;
  padding: 0 20px;
}
.comment-body{
  
  border: 1px solid #f6f6f6;
  border-top: transparent;
  background-color: #fff;
  box-sizing: content-box;
  padding: 26px 20px;
}
.delete{
  position: absolute;
  bottom: 30px;
  right: 120px;
  display: none;
}
.comment-body>p>span>img{
  max-width: 100%;
  height: auto;
}
</style>