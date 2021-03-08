<template>
  <div class="card">
    <div class="card-header">
      <div class="card-title">{{title}}</div>
      <div class="card-theme"><span class="theme-dec">/</span><h2 class="theme-text">{{theme}}</h2></div>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    theme: { type: String, required: true }
  }
}
</script>

<style>
.card{
  width: 1180px;
  margin: 0 auto;
}
.card-title{
  font-family: AlternateGothicPro, sans-serif;
  font-size: 120px;
  color: rgb(170, 170, 170);
  font-weight: 400;
}
.card-theme{
  margin-top: -30px;
  font-family: AlternateGothicPro, sans-serif;
  color: rgb(255, 72, 72);
}
.theme-dec{
  font-size: 50px;
  letter-spacing: 0px;
  line-height: 50px;
  padding-right: 5px;
  font-weight: 400;
}
.theme-text{
  display: inline-block;
  font-size: 50px;
  letter-spacing: 0px;
  line-height: 50px;
  font-weight: 400;
}
</style>