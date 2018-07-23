<template>
  <div class="">
    <div class="" style="margin-top:6%;">
      <div class="row">
        <div class="col s10 m4" v-for='todo in getTodo'>
          <div class="card dark accent-2">
            <div class="">
              <div class="card-content grey lighten-4">
                <h5> <u> <b>{{ todo.activity }}</b> </u></h5>
                <br>
                <p><b>{{ todo.description }}</b></p>
              </div>
              <div class="card-content">
                <img src="@/assets/one-hundred-percent-459227_960_720.png"
                alt=""
                style="width:47.8%;"
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
  </div>
</template>

<script>
import axios from 'axios'
import Datepicker from 'vuejs-datepicker';

export default {
  created () {
    if (!localStorage.hasOwnProperty('authorization')) {
      this.$router.push('/')
    } else {
      const token = localStorage.getItem('authorization')
      this.$store.dispatch('getTodo', token)
    }
  },
  components: {
    Datepicker
  },
  data () {
    return  {
      // formAdd : false
    }
  },
  computed: {
    getTodo () {
      return this.$store.state.allTodo
    },
    formAdd () {
      return this.$store.state.formAdd
    }
  },
  methods: {
    updateDone (idTodo) {
      const token = localStorage.getItem('authorization')
      axios({
        method: 'put',
        url: 'http://35.240.208.249/todo',
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
        url: `http://35.240.208.249/todo/${id}`
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

<style scoped>

</style>
