<template>
  <div>
    <el-descriptions title="线路选择 (如无跳转请点击下方链接）" direction="vertical" :column="4" border>
      <el-descriptions-item label="最快线路" :span="2" label-style="my-label">
        <el-link :href="address" >{{address}}</el-link>
      </el-descriptions-item>
      <el-descriptions-item label="延迟">
        <el-tag size="small">{{delayTime}}ms</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'message',
  props:{
    address: String,
    delayTime: {
      default: 0
    }
  },
  methods:{

  }
}
</script>

<style scoped>
.my-label {
  background: #FDE2E2;
}
.my-content {
  background: #FDE2E2;
}
</style>
