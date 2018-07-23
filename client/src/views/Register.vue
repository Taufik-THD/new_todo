<template>
  <div class="home">
    <div class="container">

      <Register/>
    </div>
  </div>
</template>

<script>
import Register from '@/components/Register.vue'

export default {
  name: 'register',
  components: {
    Register
  }
}
</script>

<style scoped>
.home{
  background-image: url("http://k42.kn3.net/taringa/2/3/5/2/5/2/61/heichou/305.jpg?7473");
  background-size: cover;
}
</style>
