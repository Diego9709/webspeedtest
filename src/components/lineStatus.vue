<template>
<div>
  <el-card class="box-card" shadow="hover">
    <div>
      <el-row :gutter="20">
        <el-col :span="24"><div>
          <el-button  type="primary" @click="open(url)">线路{{number}}</el-button>
        </div></el-col>
      </el-row>
      <div class="delay-info">
        <el-row :gutter="20">
          <el-col :span="16"><div class="delay-text">
            <div v-if="status !== 0 && status !== 5">{{this.delay}}ms</div>
            <div v-else-if="status === 5">失败</div>
            <div v-else style="font-size: small">测速中</div>
          </div>
          </el-col>
          <el-col :span="8">
            <div v-if="status === 1">
              <svg-icon icon-class="good"></svg-icon>
            </div>
            <div v-else-if="status === 2">
              <svg-icon icon-class="slow"></svg-icon>
            </div>
            <div v-else-if="status === 3">
              <svg-icon icon-class="very-slow"></svg-icon>
            </div>
            <div v-else-if= "status === 4">
              <svg-icon icon-class="offline"></svg-icon>
            </div>
            <div v-else-if="status === 5">
              <svg-icon icon-class="error"></svg-icon>
            </div>
            <div v-else>
              <svg-icon icon-class="loading"></svg-icon>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>

</div>
</template>

<script>
import SvgIcon from './SvgIcon'
import Ping from 'ping.js'

export default {
  name: 'lineStatus',
  components: {SvgIcon},
  props: {
    number: String,
    url: String,
    } ,
  data () {
    return {
      delay: '',
      status: 0
    }
  },
  methods:{
    open(url){
      console.log(url)
      window.open(url,'_blank')
    }
  },
  created: function () {
    let opt = {};
    opt.timeout = 5000
    this.p = new Ping(opt)
    this.p.ping(this.url, (err, data) => {
      if (err) {
        console.log('error loading resource', err)
      }
      if (data > 0 && data < 600) {
        this.status = 1
      } else if (data > 600 && data < 1800) {
        this.status = 2
      } else if (data > 1800 && data < 3600) {
        this.status = 3
      } else if(data > 3600 && data < 8000){
        this.status = 4
      }else{
        this.status = 5
      }
      this.delay = data
      this.$emit('delayInfo', this.url, data)

    }).catch(error => {
      console.info(error)
    })
  }
}
</script>

<style>
.box-card {
  width: 120px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);


}
.delay-info{
  margin-top: 8px;
}

.delay-text{
  font-family:Arial;
}
</style>
