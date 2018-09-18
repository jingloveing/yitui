<template>
  <div class="home">
    <el-row :gutter="12" class="top">
      <el-col :sm="12" :md="8">
         <div class="top-item first">
           <div class="top-item-title">
              <span class="top-item-left">企业总数</span>
              <span class="top-item-right">月</span>
           </div>
           <div class="top-item-main">
              <h3 class="num">255.00</h3>
              <p class="pro-title">同上期增长</p>
             <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
           </div>
         </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="top-item second">
          <div class="top-item-title">
            <span class="top-item-left">企业总数</span>
            <span class="top-item-right">年</span>
          </div>
          <div class="top-item-main">
            <h3 class="num">255.00</h3>
            <p class="pro-title">同上期增长</p>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
          </div>
        </div>
      </el-col>
      <el-col :sm="12" :md="8">
        <div class="top-item third">
          <div class="top-item-title">
            <span class="top-item-left">企业总数</span>
            <span class="top-item-right">日</span>
          </div>
          <div class="top-item-main">
            <h3 class="num">255.00</h3>
            <p class="pro-title">同上期增长</p>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="70"></el-progress>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="echarts">
      <el-col :span="16" style="height: 100%">
        <div class="echarts-title">
          <span class="echarts-title-t">活跃流量</span>
          <ul class="time-list">
            <li v-for="(item,index) in dateData" :class="dateIndex==index?'selected':''" @click="selectDate(index)">{{item}}</li>
          </ul>
        </div>
        <line-chart :chart-data="lineChartData" style="height: calc(100% - 51px)"/>
      </el-col>
      <el-col :span="8" style="height: 100%;padding-top: 52px;">
        <p class="rate-title">效果报告</p>
       <div class="rate">
         <p><span class="l-rate">65%</span><span class="r-rate">转化率(日同比20%)</span></p>
         <el-progress :stroke-width="10" :percentage="70" :show-text="false" class=""></el-progress>
       </div>
        <div class="rate">
          <p><span class="l-rate">65%</span><span class="r-rate">签到率(日同比20%)</span></p>
          <el-progress :show-text="false" :stroke-width="10" :percentage="70"></el-progress>
        </div>
        <p class="rate-title">实时监控</p>
       <div class="rate">
         <p><span class="l-rate">65%</span><span class="r-rate">CPU使用率</span></p>
         <el-progress :show-text="false" :stroke-width="10" :percentage="70"></el-progress>
       </div>
        <div class="rate memory-rate">
          <p><span class="l-rate">65%</span><span class="r-rate">内存占用率</span></p>
          <el-progress :show-text="false" :stroke-width="10" :percentage="70"></el-progress>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="12" style="margin-bottom: 48px;">
      <el-col :xs="12" :sm="8"  :lg="6">
         <div class="card card1">
          <div style="position: absolute;bottom: 30px;left: 39px;">
            <p>查看名片次数</p>
            <h4>255.00</h4>
          </div>
         </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6">
        <div class="card card2">
          <div style="position: absolute;bottom: 30px;left: 39px;">
            <p>查看商城次数</p>
            <h4>255.00</h4>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6">
        <div class="card card3">
          <div style="position: absolute;bottom: 30px;left: 39px;">
            <p>查看动态次数</p>
            <h4>255.00</h4>
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="8" :lg="6">
        <div class="card card4">
          <div style="position: absolute;bottom: 30px;left: 39px;">
            <p>查看官网次数</p>
            <h4>255.00</h4>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineChart from './components/LineChart'
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165]
    }
  }
  export default {
    name: 'Home',
    components:{
      LineChart,
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        dateData:['日','月','年'],
        dateIndex:0
      }
    },
    methods: {
      selectDate(index){
        this.dateIndex=index
      }
    }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  .top{
    margin: 20px 0px 0;
  }
  .top-item{
    background: white;
    border-radius:8px;
    box-shadow:0px 0px 2px 2px rgba(35,51,95,0.1);
    margin-bottom: 20px;
  }
.top-item-title{
  line-height: 53px;
  border-bottom: 1px solid rgba(241,241,241,1);
  padding: 0 16px 0 48px;
}
  .top-item-left{
    font-size:18px;
    font-weight:300;
    color:rgba(34,34,34,1);
  }
  .top-item-right{
    float: right;
    width:36px;
    height:27px;
    line-height: 27px;
    text-align: center;
    margin-top: 12px;
    border-radius:4px;
    font-size:14px;
    color:rgba(255,255,255,1);
  }
  .first .top-item-right{
    background:rgba(54,73,126,1);
  }
  .second .top-item-right{
    background:rgba(0,150,136,1);
  }
  .third .top-item-right{
    background:rgba(251,154,60,1);
  }
  .top-item-main{
    padding: 0 16px 29px 48px;
  }
  .top-item .num{
    font-size:76px;
    font-weight:400;
    line-height: 144px;
    margin: 0;
  }
  .top-item.first .num{
    color:rgba(134,166,255,1);
  }
  .top-item.second .num{
    color:rgba(94,211,200,1);
  }
  .top-item.third .num{
    color:rgba(255,208,118,1);
  }
  .pro-title{
    font-size: 16px;
    font-weight:400;
    color:rgba(34,34,34,1);
    margin-bottom: 14px;
  }
  .echarts{
    width:100%;
    height:477px;
    background:rgba(255,255,255,1);
    border-radius:8px;
    box-shadow:0px 0px 2px 2px rgba(35,51,95,0.1);
    padding: 0 43px 0 48px;
    margin-left: 0!important;
    margin-right: 0!important;
  }
  .time-list{
    color: white;
    height:26px;
    line-height: 26px;
    float: right;
    margin: 0;
    background: rgba(138,162,243,1);
    padding: 0;
    font-size: 0;
    margin:15px 10px 0 0;
    overflow: hidden;
    border-radius:4px;
  }
  .time-list li{
    font-size: 16px;
    width:30px;
    list-style: none;
    display: inline-block;
    text-align: center;
  }
  .time-list .selected{
    background:rgba(80,114,226,1);
  }
  .time-list li:nth-child(2){
    border-left: 1px solid white;
    border-right: 1px solid white;
  }
  .echarts-title{
    height: 51px;
    line-height: 51px;
    font-weight:300;
  }
  .echarts-title-t{
    font-size:18px;
    color:rgba(34,34,34,1);
  }
  .rate-title{
    font-size:16px;
    font-weight:400;
    color:rgba(0,0,0,1);
    margin-bottom: 20px;
  }
  .rate p{
    margin-bottom: 10px;
  }
  .rate p:after{
    display: table;
    content: '';
    clear: both;
  }
  .l-rate{
    font-size: 24px;
    font-weight:300;
    color:rgba(34,34,34,1);
  }
  .r-rate{
    font-size: 16px;
    font-weight:300;
    color:rgba(102,102,102,1);
    float: right;
    margin-top: 10px;
  }
  .rate{
    margin-bottom: 35px;
  }
  .card{
    height: 240px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 20px;
    color: white;
    font-weight:300;
    position: relative;
  }
  .card p{
    font-size:16px;
    margin-bottom: 20px;
  }
  .card h4{
    font-size:48px;
    margin: 0;
  }
  .card1{
    background-image: url(../../assets/home_bg1.png);
  }
  .card2{
    background-image: url(../../assets/home_bg2.png);
  }
  .card3{
    background-image: url(../../assets/home_bg3.png);
  }
  .card4{
    background-image: url(../../assets/home_bg4.png);
  }
</style>
<style>
  .first .el-progress-bar__inner{
  background: linear-gradient(98deg,rgba(0,198,255,1),rgba(40,237,211,1));
  }
  .second .el-progress-bar__inner{
    background: linear-gradient(98deg,rgba(0,150,136,1),rgba(93,245,147,1));
  }
  .third .el-progress-bar__inner{
    background: linear-gradient(98deg,rgba(255,120,38,1),rgba(249,236,23,1));
  }
  .rate .el-progress-bar__inner{
    background: linear-gradient(98deg,rgba(95,184,120,1),rgba(113,234,147,1));
  }
  .memory-rate .el-progress-bar__inner{
    background: linear-gradient(98deg,rgba(255,87,34,1),rgba(249,153,119,1));
  }
</style>
