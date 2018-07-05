<template lang="html">
  <div class="" style="margin-top:6%;">
    <div class="row">
      <div class="col s10 m4" v-for='todo in getTodo'>
        <div class="card dark accent-2">
          <div class="">
            <div class="card-content grey lighten-4">
              <h5> <u> <b>Activity:</b> </u></h5>
              <br>
              <p><b>{{ todo.activity }}</b></p>
            </div>
            <div class="card-content">
              <img src="https://cdn.pixabay.com/photo/2014/09/24/15/13/one-hundred-percent-459227_960_720.png"
              alt=""
              style="width:49%;"
              v-if='todo.status == false'>
              <p v-if='todo.status == true && todo.deadline != null' style="padding:4.5% 0 4% 0;"> <b>Deadline: </b> {{ todo.deadline.toLocaleString().slice(0, 15) }}</p>
            </div>
            <div class="card-action grey lighten-2">
              <a class="btn" @click='updateDone(todo._id)' style="width:100%;">Done</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  created () {
    if (!localStorage.hasOwnProperty('authorization')) {
      this.$router.push('/')
    }
  },
  computed: {
    getTodo () {
      return this.$store.state.today
    }
  },
  methods: {
    updateDone (idTodo) {
      const token = localStorage.getItem('authorization')
      axios({
        method: 'put',
        url: 'http://35.240.145.166/todo',
        data: {
          id: idTodo
        }
      }).then(response => {
        this.$store.dispatch('getTodo', token)
        swal({
          title: "Good job!",
          text: "This activity is completed",
          icon: "success",
        })
      }).catch(err => {
        console.log(err)
      })
    },
    deleteTodo (id) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/todo/${id}`
      }).then(response => {
        this.getTodo()
        console.log('success')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    $(document).ready(function(){
      // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
      $('.modal-trigger').leanModal()
    })
  }
}
</script>

<style lang="css">
</style>
