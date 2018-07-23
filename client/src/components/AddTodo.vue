<template lang="html">
  <div class="card" style="width: 95%; height:100%; margin: 6% 0 0 2%;">
    <div class="container" style="width: 95%;">
      <ul class="tabs black" style="width:105%; margin-left:-2.5%;">
        <li class="tab" style="width:100%; color:white;"><b>Add new Todo</b></li>
      </ul>
      <div id="login" class="col s12">
        <form class="col s12">
          <div class="form-container">
            <div class="row">
              <br>
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" v-model='newActivity'></textarea>
                <label for="text">New Activity</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <datepicker placeholder="Date" :value="date" v-model='deadline'></datepicker>
              </div>
            </div>
            <div class="row">
              <br>
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea" v-model='todoDescription'></textarea>
                <label for="text">Note</label>
              </div>
            </div>
            <br>
            <div class="row">
              <div class="col s6">
                <a class="btn waves-effect waves-light teal blocked" @click='addTodo' style="margin-bottom: 5%; width: 100%;">Submit</a>
              </div>
              <div class="col s6">
                <a class="btn waves-effect waves-light teal blocked" @click='cancel' style="margin-bottom: 5%; width: 100%;">Cancel</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker'

export default {
  created () {
    this.checkStorage()
  },
  components: {
    Datepicker
  },
  data () {
    return {
      newActivity: '',
      todoDescription: '',
      deadline: '',
      date: ''
    }
  },
  methods: {
    checkStorage () {
      if (!localStorage.hasOwnProperty('authorization')) {
        return false
      } else {
        return true
      }
    },
    addTodo () {
      const token = localStorage.getItem('authorization')

      const todo = {
        activity: this.newActivity,
        deadline: this.deadline,
        description: this.todoDescription,
        token
      }

      axios({
        method: 'post',
        url: 'http://35.240.208.249/todo/add',
        data: todo
      }).then(() => {
        this.$router.push('todo')
      }).catch(err => {
        console.log(err)
      })
    },
    cancel () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #dfe6e9;
}
nav {
  color: #fff;
  background-color: black;
  width: 100%;
  position: inherit;
  text-align: left;
  position: absolute;
  z-index: 999;
  width: 100%;
}
</style>
