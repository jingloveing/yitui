<template>
  <div class="home">
      <div style="margin-top: 18px;">
        <div class="card-group">

          <div class="row box-card box-first">
            <div class="col-md-12 card-title">名片状态</div>
            <div class="col-md-6">
              <p><i class="iconfont icon-ren"></i>员工总数</p>
              <p class="box-card-num" id="amount">{{data.yuanNumber}}</p>
            </div>
            <div class="col-md-6">
              <p><i class="iconfont icon-mingpian1"></i>可用名片/拥有名片</p>
              <p class="box-card-num"><span id="canusecard">{{ enterprise.cardTotal - enterprise.cardUsed }}</span>/<span id="cardnum">{{enterprise.cardTotal}}</span></p>
            </div>
          </div>
          <div class="row box-card box-two">
            <div class="col-md-12 card-title">账号状态</div>
            <div class="col-md-4">
              <p>已使用天数</p>
              <p>剩余可用天数</p>
              <p>已获取客户数</p>
            </div>
            <div class="col-md-3">
              <p><span class="box-card-num" id="userDay">{{ [enterprise.payTime, Date.now()] | formatDurationAsDay }}</span>天</p>
              <p><span class="box-card-num" id="restTime">{{ [Date.now(), enterprise.expireAt]  | formatDurationAsDay }}</span>天</p>
              <p><span class="box-card-num customerNumber">0</span>人</p>
            </div>
            <div class="col-md-3 box-card-time">
              <p><span id="payTime">{{ enterprise.payTime | formatDate }}</span>开通</p>
              <p><span id="maturityTime">{{ enterprise.expireAt | formatDate }}</span>截止</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-group">
        <div class="box-card box-card-w100" style="padding-bottom: 100px;">
          <div class="card-title">数据概览</div>
          <div class="data-left">
            <div class="data-left-box sjgl-title">
              <div class="btn-group sjgl" data-toggle="buttons">
                <label id="option1" class="btn btn-primary active">
                  <input type="radio" name="options"  autocomplete="off" checked> 汇总
                </label>
                <label id="option2" class="btn btn-primary">
                  <input type="radio" name="options"  autocomplete="off"> 昨日
                </label>
                <label id="option3" class="btn btn-primary">
                  <input type="radio" name="options"  autocomplete="off"> 近7天
                </label>
                <label id="option4" class="btn btn-primary">
                  <input type="radio" name="options"  autocomplete="off"> 近30天
                </label>
              </div>

              <div class="sjgl-item sjgl-item1">
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>客户总数</p>
                      <p class="first-num customerNumber">{{dataOverView.customerNumber}}</p>
                    </div>
                  </div>
                </div>
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>跟进总数</p>
                      <p class="first-num" id="followNumber">{{dataOverView.followNumber}}</p>
                    </div>
                  </div>
                </div>
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>浏览总数</p>
                      <p class="first-num" id="viewcardNumber">{{dataOverView.viewcardNumber}}</p>
                    </div>
                  </div>
                </div>
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>被转发总数</p>
                      <p class="first-num" id="forwardedNumber">{{dataOverView.forwardedNumber}}</p>
                    </div>
                  </div>
                </div>
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>被保存总数</p>
                      <p class="first-num" id="saveedNumber">{{dataOverView.saveedNumber}}</p>
                    </div>
                  </div>
                </div>
                <div class="border1">
                  <div class="border2">
                    <div class="border3">
                      <p>被点赞总数</p>
                      <p class="first-num" id="goodedNumber">{{dataOverView.goodedNumber}}</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="data-left-box">
              <div class="chart-select">
                <div>数据指标</div>
                <div class="btn-group select-box">
                  <button type="button" data-toggle="dropdown" id="etit">
                    客户总数
                  </button>
                  <ul class="dropdown-menu" role="menu" id="eclick">
                    <li>
                      <a href="#">客户总数</a>
                    </li>
                    <li>
                      <a href="#">跟进总数</a>
                    </li>
                    <li>
                      <a href="#">浏览总数</a>
                    </li>
                    <li>
                      <a href="#">被转发总数</a>
                    </li>
                    <li>
                      <a href="#">被保存总数</a>
                    </li>
                    <li>
                      <a href="#">被点赞总数</a>
                    </li>
                  </ul>
                </div>
                <div class="btn-group chart-date" id="chooseday">
                  <button type="button" class="btn btn-default active">7天</button>
                  <button type="button" class="btn btn-default">15天</button>
                </div>
              </div>
              <div class="chart-box">
                <div style="width: 90%;height:400px;">
                  <line-chart :chart-data="lineChartData" style="height: calc(100% - 51px)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-group">
        <div class="box-card box-card-w100">
          <div class="card-title">常用功能</div>

          <div class="cygn">
            <a>
              <div class="row">
                <div class="col-md-2"><i class="iconfont icon-haofangtuo400iconfontpengyouquan"></i></div>
                <div class="col-md-10">
                  <p>发布企业动态</p>
                  <p>快速发布企业最新动态、资讯</p>
                </div>
              </div>
            </a>
            <a>
              <div class="row">
                <div class="col-md-2"><i class="iconfont icon-lifangtilitiduomiantifangkuai"></i></div>
                <div class="col-md-10">
                  <p>公司产品管理</p>
                  <p>快速上传、编辑公司产品</p>
                </div>
              </div>
            </a>
            <a>
              <div class="row">
                <div class="col-md-2"><i class="iconfont icon-fangchan"></i></div>
                <div class="col-md-10">
                  <p>官网编辑</p>
                  <p>对小程序官网进行模块化编辑</p>
                </div>
              </div>
            </a>
            <a>
              <div class="row">
                <div class="col-md-2"><i class="iconfont icon-yuangongguanli"></i></div>
                <div class="col-md-10">
                  <p>新增员工</p>
                  <p>在企业通讯录快速新增员工</p>
                </div>
              </div>
            </a>
            <a>
              <div class="row">
                <div class="col-md-2"><i class="iconfont icon-leidatance"></i></div>
                <div class="col-md-10">
                  <p>雷达权限管理</p>
                  <p>管理员工名片和雷达的启用/停用状态</p>
                </div>
              </div>
            </a>

          </div>

        </div>
      </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
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
    computed: {
      ...mapGetters([
        'enterprise',
      ])
    },
    filters: {
      formatDurationAsDay ([from, to]) {
        return Math.round((to - from) / ( 24 * 3600 * 1000 ))
      },
      formatDate (timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        return [year, month, day].map(n => {
          n = n.toString()
          return n[1] ? n : '0' + n
        }).join('-')
      }
    },
    data() {
      return {
        data:{},
        dataOverView:{
          customerNumber:0,
          forwardedNumber:0,
          viewcardNumber:0,
          followNumber:0,
          saveedNumber:0,
          goodedNumber:0
        },
        daynum:'1',
        lineChartData: lineChartData.newVisitis,
        dateData:['日','月','年'],
        dateIndex:0
      }
    },
    methods: {
      selectDate(index){
        this.dateIndex=index
      },
     getAllData(){
       // this.$store.dispatch('GetHomeData', '7').then((res) => {
       //   if(res.code && res.code==500){
       //     this.$message({
       //       message:res.message,
       //       type: 'error',
       //       duration: 5 * 1000
       //     })
       //   }else{
       //     this.data=res
       //     this.dataOverView.customerNumber=res.customerNumber
       //     this.dataOverView.forwardedNumber=res.forwardedNumber
       //     this.dataOverView.viewcardNumber=res.viewcardNumber
       //     this.dataOverView.followNumber=res.followNumber
       //     this.dataOverView.saveedNumber=res.saveedNumber
       //     this.dataOverView.goodedNumber=res.goodedNumber
       //   }
       // }).catch((err) => {
       //   console.log(err)
       // })
     },
    getDataOverView(){
        console.log(this.daynum)
      this.$store.dispatch('GetDataOverView', this.daynum).then((res) => {
        if(res.code && res.code==500){
          this.$message({
            message:res.message,
            type: 'error',
            duration: 5 * 1000
          })
        }else{
          this.dataOverView.customerNumber=res.customerNumber
          this.dataOverView.forwardedNumber=res.forwardedNumber
          this.dataOverView.viewcardNumber=res.viewcardNumber
          this.dataOverView.followNumber=res.followNumber
          this.dataOverView.saveedNumber=res.saveedNumber
          this.dataOverView.goodedNumber=res.goodedNumber
        }
      }).catch((err) => {
        console.log(err)
      })
    },


    },
  mounted:function(){
      var self =this
    $("#chooseday button").click(function() {
      $(this).addClass("active").siblings().removeClass("active");
    });
    $("#eclick li a").click(function() {
      var tt = $(this).html()
      $("#etit").html(tt);
    });
    $("#option1").click(function() {
      self.daynum = 1;
      self.getDataOverView();
    });
    $("#option2").click(function() {
      self.daynum = 2;
      self.getDataOverView()
    });
    $("#option3").click(function() {
      self.daynum = 7;
      self.getDataOverView()
    });
    $("#option4").click(function() {
      self.daynum = 30;
      self.getDataOverView()
    });
  },
    created(){
      this.getAllData()
      // this.getDataOverView()
    }
}
</script>

<style scoped>
  .home{
    background-color: #f8f9fb;
    width: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: auto;
    height: auto;
    min-width: 100%;
    float: left;
    overflow-x: hidden;
  }
  .card-group{
    display: flex;
    justify-content: space-between;
    /*margin-left: 0px;*/
  }
  .card-group .box-card{
    width: 47%;
    margin-bottom: 30px;
    margin-right: 63px;
    margin-left: 20px;
    border: 1px solid #f0f0f0;
    -webkit-box-shadow: 0 2px 8px 0 hsla(0,0%,89%,.5);
    box-shadow: 0 2px 8px 0 hsla(0,0%,89%,.5);
    background-color: #fff;
    color: #303133;
    border-radius: 4px;
    padding: 38px 40px;
    font-size: 16px;
  }
  .card-group .box-first{
    margin-right: 15px;
  }
  .card-group .box-card .card-title{
    font-size: 20px;
    text-align: left;
    margin-top: 0;
  }
  .card-group .box-card .iconfont{
    font-size: 20px;
    margin-right: 15px;
  }
  .card-group .box-first p{
    margin: 30px 0 0 0;
  }
  .card-group .box-card .box-card-num{
    font-family: PingFangSC-Medium;
    font-size: 30px;
    color: #4877c1;
    letter-spacing: 0;
  }
  .card-group .box-two p{
    line-height: 40px;
    margin-bottom: 0;
  }
  .card-group .box-two>*{
    margin-top: 20px;
  }
  .card-group .box-two .box-card-num{
    vertical-align: middle;
    margin-right: 15px;
  }
  .card-group .box-two .box-card-time{
    color: #7d7d7d;
    font-size: 14px;
  }
  .card-group .box-card-w100{
    width: 100%;
  }
  .data-left{
    display: flex;
    justify-content: space-between;
  }
  .data-left .data-left-box{
    width: 50%;
    margin-top: 38px;
  }
  .data-left .sjgl-title{
    text-align: left;
  }
  .data-left .sjgl-title .sjgl .btn{
    padding: 12px 20px;
  }
  .data-left .sjgl-title .sjgl .btn-primary{
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
  }
  .data-left .sjgl-title .sjgl .active{
    background: #fff!important;
    border: 1px solid #dcdfe6!important;
    color: #008CC8!important;
    box-shadow: none!important;
    font-weight: 600;
  }
  .data-left .sjgl-title .sjgl .btn-primary:hover,.sjgl .active:hover{
    color: #008CC8;
    /*font-weight: 600;*/
    background: #fff;
    border: 1px solid #dcdfe6;
  }
  .data-left .sjgl-item{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    text-align: center;
    margin: 30px 0 0 10px;
  }
  .data-left .sjgl-item .border1{
    width: 30%;
    margin: 3px;
    border: 1px solid rgba(72,119,193,.1);
    min-width: 130px;
    min-height: 110px;
  }
  .data-left .sjgl-item .border2{
    margin: 3px;
    border: 1px solid rgba(72,119,193,.3);
    min-height: 105px;
  }
  .data-left .sjgl-item .border3{
    margin: 3px;
    border: 2px solid rgba(72,119,193,.6);
    height: 11vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 15px 0;
    min-height: 96px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }
  .data-left .sjgl-item .border3 p{
    margin-bottom: 0;
  }
  .data-left .sjgl-item .border3 p.first-num{
    font-family: PingFangSC-Semibold;
    font-size: 30px;
    color: #4e4e4e;
    line-height: 50px;
  }
  .data-left .sjgl-item .border3 p:nth-child(3){
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #7d7d7d;
    letter-spacing: 0;
    line-height: 26px;
  }
  .data-left .sjgl-item .border3 p.per-red{
    color: #de0200;
  }
  .data-left .sjgl-item .border3 p.per-green{
    color: #09a700;
  }
  .data-left .sjgl-item:not(.sjgl-item1){
    display: none;
  }
  .chart-select{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #606266;
    font-size: 14px;
  }
  .chart-select .select-box{
    width: 30%;
    display: flex;
  }
  .chart-select .select-box>button{
    width: 80%;
    margin: 0 auto!important;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: left;
  }
  .chart-select .select-box>button:hover{
    border-color: #c0c4cc;
  }
  .chart-select .select-box>button span{
    float: right;
  }
  .chart-select .select-box>ul{
    width: 80%;
    left: 10%;
    border: 1px solid #e4e7ed;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    margin: 5px 0;
  }
  .chart-select .select-box>ul li{
    height: 34px;
    line-height: 34px;
  }
  .chart-select .select-box>ul li a{
    color: #606266;
    line-height: inherit;
  }
  .chart-date .btn-default{
    border: 1px solid #dcdfe6;
    padding: 10px 20px;
  }
  .chart-date .btn-default:hover,.chart-date .btn-default:focus{
    background: #fff!important;
    border: 1px solid #dcdfe6;
    color: #008CC8;
    box-shadow: none;
  }
  .chart-date .active{
    background: #fff!important;
    border: 1px solid #dcdfe6!important;
    color: #008CC8!important;
    box-shadow: none!important;
    font-weight: 600;
  }














  /*three*/
  .cygn{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .cygn>a{
    width: 48%;
    margin-top: 32px;
  }
  .cygn>a:hover{
    background-color: hsla(220,3%,78%,.3);
  }
  .cygn .row{
    margin: 0;
    border: 1px solid #e1e1e1;
    padding: 25px 0 20px;
  }
  .cygn .row .col-md-2{
    text-align: right;
    padding-right: 20px;
    margin-top: -10px;
  }
  .cygn .row .col-md-2 i{
    color: #008CC8;
    font-size: 50px;
    margin-right: 0;
  }
  .cygn .row .col-md-10{
    text-align: left;
  }
  .cygn .row .col-md-10 p:first-child{
    color: #6487bd;
    font-size: 18px;
  }
  .cygn .row .col-md-10 p:last-child{
    color: #646464;
    font-size: 14px;
    margin-top: 10px!important;
    margin-bottom: 0;
  }



  .mui-switch:checked:before {
    left: 21px;
  }

</style>
