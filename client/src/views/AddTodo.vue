<template>
  <div class="todo">
    <Header/>
    <AddTodo/>
  </div>
</template>

<script>
import AddTodo from '@/components/AddTodo'
import Header from '@/components/Header'
export default {
  name: 'todo',
  components: {
    AddTodo,
    Header
  }
}
</script>

<style lang="css">
</style>
