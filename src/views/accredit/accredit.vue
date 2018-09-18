<template>
  <div class="accredit">
    <div class="title"><img src="/src/assets/img/logos.png" alt="" class="logo">企业微信:{{name}}</div>
     <div class="main">
        <div class="list">
          <img src="/src/assets/img/address_list.png" alt="" class="icon">
          <span class="text">通讯录</span>
          <!--授权之后button失效，已授权-->
          <button class="img-btn" style="background: url(/src/assets/img/btn_bg1.png)">去授权</button>
        </div>
       <div class="list">
         <img src="/src/assets/img/AI.png" alt="" class="icon">
         <span class="text">AI雷达</span>
         <button class="img-btn" style="background: url(/src/assets/img/btn_bg2.png)">去授权</button>
       </div>
       <div class="list">
         <img src="/src/assets/img/boss.png" alt="" class="icon">
         <span class="text">Boss雷达</span>
         <button class="img-btn" style="background: url(/src/assets/img/btn_bg3.png)">去授权</button>
       </div>
     </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        name: "accredit",
      computed: {
        ...mapGetters([
          'sidebar',
          'avatar',
          'name'
        ])
      },
      data(){
          return{

          }
      }
    }
</script>

<style scoped>
  .accredit{
    margin-top: 20px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    box-shadow:0rem 0rem 2px 2px rgba(35,51,95,0.1);
  }
  .accredit:before{
    display: table;
    content: "";
  }
  .logo{
    width:54px;
    height:54px;
    border-radius:50%;
    margin-right: 36px;
  }
  .title{
    height: 67px;
    line-height: 67px;
    font-size:14px;
    font-weight:400;
    color:rgba(68,68,68,1);
    padding: 0 50px;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(233,233,233,1);
  }
  .list{
    width:278px;
    height: 144px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 140px;
    border-top: 1px solid rgba(245,245,250,1);;
  }
  .list:first-child{
    border-top: none;
  }
  .icon{
    width:41px;
    height:41px;
  }
  .text{
    font-size:16px;
    font-weight:300;
    color:rgba(34,34,34,1);
  }
  .img-btn{
    width:70px;
    height:30px;
    line-height: 30px;
    font-size:14px;
    font-weight:300;
    color:rgba(255,252,252,1);
    text-align: center;
    padding: 0;
    background-size: 100% 100% !important;
  }
</style>
