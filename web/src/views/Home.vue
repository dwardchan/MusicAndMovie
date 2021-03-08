<template>
  <div>
    <div class="swiper-css">
    <swiper  :options="swiperOptions" >
      <swiper-slide><img src="../assets/img/109951165774414452.jpg" alt=""></swiper-slide>
      <swiper-slide><img src="../assets/img/xijuzhiwang.png" alt=""></swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    </div>

    <card title='' theme='热门话题'>
      <div class="news-list">
        <ul>
          <router-link
          tag="li"
          :to="`/article/${items._id}`"
           v-for="(items, index) in articleList" :key="index">
            <div class="list-box" ><span>{{index+1}}</span><p>{{items.title}}</p></div>
          </router-link>
        </ul>
      </div>
    </card>
    <card title='电影' theme='推荐'>
      <p>
      </p>
    </card>
    <card title='音乐' theme='专题'>
      <p>sadf<br>
        sdfsdf<br>
        sdfs<br>
      </p>
    </card>
  </div>
</template>

<script>
import Card from '../components/Card'

export default {
  name: 'Home',
  data() {
      return {
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        },
        musicCats:[],
        articleList: [],
      }
    },
    components: {
    Card
    },
    mounted() {
     
    },
    computed: {
    },
    created() {
      this.fetchArticleCats()
    },
    methods: {
      async fetchArticleCats() {
        const res = await this.$http.get('article/list')
        this.articleList = res.data
        
      }
    }
  
}
</script>

<style scoped>
.swiper-css{
  width: 1180px;
  margin: 0 auto;
}
.news-list{
  height: 500px;
}

.list-box>span{
  font-family: AlternateGothicPro, sans-serif;
  font-size: 36px;
  letter-spacing: 0px;
  line-height: 36px;
  color: rgb(170, 170, 170);
  margin-right: 20px;
  font-weight: 400;
}
.list-box>p{
  display: inline-block;
}
.list-box{
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid rgb(221, 221, 221);
  border-right-color: rgb(221, 221, 221);
  border-bottom-color: rgb(221, 221, 221);
  border-left-color: rgb(221, 221, 221);
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
