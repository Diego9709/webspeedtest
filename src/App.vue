<template>
  <div style="padding-top: 5%; padding-left: 10%; padding-right: 10%">
    <el-row >
      <el-col :span="24"><div class="grid-content bg-purple-dark" style="text-align: center;color: red; font-size: 50px; font-family: 'Microsoft JhengHei UI'">
        {{ title }}
      </div></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24" >
        <el-tabs>
          <el-tab-pane label="消息">
            <message :address="address" :delayTime="delay"></message>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div style="margin-top: 15px;margin-bottom: 15px; ">
          <el-button plain type="success" @click="reload">{{this.content}}</el-button>
        </div>
      </el-col>
      <el-col :span="8" style="padding-top: 20px">
        <el-alert
          title="提示：延迟越低，速度越快！请优先选着绿色线路"
          type="error">
        </el-alert>
      </el-col>
      <el-col :span="8">
        <div style="float: right; padding-top: 20px">
          <el-switch v-model="autoRedirect" active-text="自动跳转" @change="setCookies(autoRedirect)" ></el-switch>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24" >
        <el-tabs>
          <el-tab-pane label="线路测速">
            <line-table v-on:delayResult="delayResult" :key="componentKey"></line-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div >
    </div>

  </div>
</template>

<script>

import LineStatus from '@/components/lineStatus'
import LineTable from '@/components/lineTable'
import Message from '@/components/Message'
import axios from 'axios'
export default {
  name: 'App',
  components: {LineStatus,LineTable,Message},
  data() {
    return {
      title: '',
      componentKey: 0,
      address: '',
      delay: 0,
      autoRedirect: true,
      isLoading: true,
      content: '',
      seconds: 5
    }
  },

  methods:{
    delayResult(address, delayTime){
      this.address = address
      this.delay = delayTime
    },
    reload() {
      this.componentKey += 1;
      this.countDownAndRedirect();
    },
    countDown() {
      let clock = window.setInterval(() => {
        this.seconds --
        this.content = this.seconds + 's后跳转'
        if(this.seconds < 0){
          window.clearInterval(clock)
          this.content = '重新测速'
          this.seconds = 5
        }
      },1000)
    },
    countDownAndRedirect() {
      this.seconds = 3;
      let clock = window.setInterval(() => {
        if(this.autoRedirect){
          this.seconds --
          this.content = this.seconds + 's后跳转'
        }
        if(this.seconds < 0){
          window.clearInterval(clock)
          this.content = '重新测速'
          this.seconds = 3
        };
        if(this.autoRedirect && this.seconds <= 0){
          this.newLink(this.address)
        }
      },1000)
    },
    wait(time){
      return new Promise((resolve) => setTimeout(resolve, time));
    },
    newLink(url){
      // 打开页面，此处最好使用提示页面
      let newLink = window.open('_blank');
      axios.get(url)
        .then(function (response) {
          newLink.location.href = url;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    setCookies(autoDirect){
      if(autoDirect){
        this.$cookies.set('isAutoDirect',1,-1);
      }else {
        this.$cookies.set('isAutoDirect',0,-1);
      }

    }
  },


  created () {
    axios.get('../../static/addresses.json').then(res=>{
      this.title = res.data.title;
    });

    if(this.$cookies.get('isAutoDirect') === '0'){
      this.autoRedirect = false
    }else {
      this.autoRedirect = true
    }
    console.log(this.$cookies.get('isAutoDirect'))

    this.countDown();
    this.wait(3000).then((res)=>{
      console.log(this.address)
      if(this.address === ''){

      }
      if(this.autoRedirect){
        window.location.href = this.address
      }
    })

  }
}
</script>
<style>
.title {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
</style>
