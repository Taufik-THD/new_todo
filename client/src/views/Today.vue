<template>
  <div class="todo">
    <Header/>
    <Today/>
  </div>
</template>

<script>
import Today from '@/components/Today'
import Header from '@/components/Header'
export default {
  name: 'todo',
  components: {
    Today,
    Header
  }
}
</script>

<style lang="css">
</style>
