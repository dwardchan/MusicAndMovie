<template>
  <div class="page-article">
    <div class="top">
      <h1><span>{{title}}</span></h1>
    </div>
    <div class="top-detail">
      <ul>
        <li>
          <div class="">
            <div ><span>提问时间</span></div>
            <span>时间</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    // theme: { type: String, required: true }
  }
}
</script>

<style>
.top{
  height: 190px;
  background-color: #151515;
}
.top>h1{
  display: flex;
  margin: 0 250px;
  padding-top: 110px;
}
.top>h1>span{
  font-size: 50px;
  letter-spacing: 0px;
  line-height: 50px;
  color: rgb(242, 242, 242);
  font-weight: 400;
}
</style>