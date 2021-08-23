<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="{span:8}" :sm="{span:6}" :md="{span:4}" v-for="(item,i) in addresses" :key = i>
        <div style="padding-bottom: 10px">
          <line-status  v-on:delayInfo="delayInfo" :number="(i+1).toString()" :url="item"></line-status>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import LineStatus from './lineStatus'
import axios from 'axios'
export default {
  name: 'lineTable',
  components: {LineStatus},
  data () {
    return {
      addresses: [],
      fastestUrl:'',
      shortestTime: 1000,
    }
  },
  created: function() {
    axios.get('../../static/addresses.json').then(res=>{
      this.addresses = res.data.sites
    })

  },
  methods: {
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`;
    },
    delayInfo (address,delay) {
      if(this.shortestTime > delay){
        this.shortestTime = delay;
        this.fastestUrl = address;
      }
      this.$emit('delayResult',this.fastestUrl,this.shortestTime)
    }



  }
}
</script>

<style scoped>

</style>
