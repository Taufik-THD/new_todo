<template>
  <div class="home">
    <Homepage/>
  </div>
</template>

<script>
// @ is an alias to /src
import Homepage from '@/components/Homepage.vue'

export default {
  name: 'home',
  components: {
    Homepage
  }
}
</script>

<style scoped>
.home{
  background-image: url("http://wallpapersqq.net/wp-content/uploads/2015/12/Mikasa-Ackerman-Attack-On-Titan-vector.jpg");
  background-size: cover;
}
</style>
