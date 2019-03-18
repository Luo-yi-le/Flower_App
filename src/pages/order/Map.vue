<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :zoom="zoom" :center="center" class="amap-demo">
      <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events"></el-amap-polyline>
    </el-amap>

    <div class="toolbar">
      <button type="button" name="button" v-on:click="changeEditable">change editable</button>
    </div>
  </div>
</template>

<style>
  .amap-demo {
    height: 300px;
  }
</style>

<script>
  module.exports = {
    name:'Map',
    data() {
      return {
        zoom: 12,
        center: [121.5273285, 31.25515044],
        polyline: {
          path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
          events: {
            click(e) {
              alert('click polyline');
            },
            end: (e) => {
              let newPath = e.target.getPath().map(point => [point.lng, point.lat]);
              console.log(newPath);
            }
          },
          editable: false
        }
      };
    },
    methods: {
      changeEditable() {
        this.polyline.editable = !this.polyline.editable;
      }
    }
  };
</script>
