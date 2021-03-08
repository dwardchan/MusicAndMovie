<template>
  <div>
    <h1>{{ id ? '编辑' : '新建'}}电影</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="主演">
        <el-input v-model="model.actor"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple filterable>
          <el-option v-for="i of categories" :key="i._id" 
          :label="i.name" :value="i._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分数">
        <el-input v-model="model.scores.doubanRating"></el-input>
        <el-input v-model="model.scores.imdbRating"></el-input>
      </el-form-item>
      <el-form-item label="图片" width="120px">
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
      <el-form-item label="简介">
        <el-input type="textarea" v-model="model.description"></el-input>
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
      model: {
        scores: {}
      },
     
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
        await this.$http.put(`rest/movies/${this.id}`, this.model)
      }else {
        await this.$http.post('rest/movies', this.model)
      }
      
      this.$router.push('/movies/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/movies/${this.id}`)
      //使用浅拷贝合并res.data和model对象使得层级关系可以显示（scores那）
      this.model = Object.assign({}, this.model, res.data)
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>