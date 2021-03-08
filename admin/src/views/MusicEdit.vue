<template>
  <div>
    <h1>{{ id ? '编辑' : '新建'}}音乐</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="歌手">
        <el-input v-model="model.artist"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple filterable>
          <el-option v-for="i of categories" :key="i._id" 
          :label="i.name" :value="i._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers='getAuthHeaders()'
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.img" :src="model.img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>  
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      model: {},
     
    }
  },
  methods: {
    afterUpload(res){
      //vue 中的显示赋值
      this.$set(this.model, 'img', res.url)
      // this.model.icon = res.url
    },
    async save() { 
      if(this.id) {
        await this.$http.put(`rest/music/${this.id}`, this.model)
      }else {
        await this.$http.post('rest/music', this.model)
      }
      
      this.$router.push('/music/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/music/${this.id}`)
      this.model = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    }
  },
  created() {
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>