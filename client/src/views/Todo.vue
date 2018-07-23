<template>
  <div class="todo">
    <Header/>
    <Todo/>
  </div>
</template>

<script>
import Todo from '@/components/Todo'
import Header from '@/components/Header'
export default {
  name: 'todo',
  components: {
    Header,
    Todo
  }
}
</script>

<style lang="css">
</style>
