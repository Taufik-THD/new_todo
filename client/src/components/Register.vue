<template>
  <div class="register" style="background-color:transparent">
    <div class="container" style="padding-left:5%;">
      <div class="row">
        <div class="col s10" style="margin: 5% 0 4% 0;">
          <form class="col s12">
            <h4 style="text-align:center"><b>Sign Up</b> </h4>
            <div class="row">
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="fullname" type="text" class="validate" v-model='username'>
                <label for="fullname">Full Name</label>
              </div>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="email" type="text" class="validate" v-model='email'>
                <label for="email">Email</label>
              </div>

              <div class="input-field col s12" style="padding-right:15px;">
                <input id="password" type="password" class="validate" v-on:keyup='checkValidation' v-model='password'>
                <label for="password">Password</label>
              </div>
              <label class="left" style="margin:-2% 0 0 2%; color:red;" v-if='validation == false'>Password minimum 6 character!</label>
              <div class="input-field col s12" style="padding-right:15px;">
                <input id="confirmpassword" type="password" class="validate" v-on:keyup='check' v-model='confirm'>
                <label for="confirmpassword">Confirm Password</label>
              </div>
              <label class="left" style="margin:-2% 0 0 2%; color:red;" v-if='checkPassword == false'>Password didn't match!</label>
            </div>
            <a class="btn btn-block" @click='register'>Sign Up</a>
            <br>
            <hr>
            <p>Already have an account? <a @click='backToHomepage' style="cursor: pointer;"><u>Sign In here</u></a> </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  created () {
    if (localStorage.hasOwnProperty('authorization')) {
      this.$router.push('/todo')
    }
  },
  data () {
    return {
      username: '',
      email: '',
      password: '',
      confirm: '',
      checkPassword: true,
      validation: true
    }
  },
  methods: {
    backToHomepage () {
      this.$router.push('/')
    },
    register () {
      if (this.checkPassword == true && this.validation == true && this.password.length != 0) {

        const userData = {
          username: this.username,
          email: this.email,
          password: this.password
        }

        axios({
          method: 'post',
          url: 'http://35.240.145.166/users/register',
          data: userData
        }).then(response => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.confirm = ''
          this.$router.push('/')
          swal({
            title: "Yosh!",
            text: "Successfully register your account",
            icon: "success",
          });
        }).catch(err => {
          console.log(err)
        })
      } else {
        swal({
          text: "Please input a valid data . . .",
          icon: "error"
        })
      }
    },
    check () {
      if (this.password == this.confirm || this.confirm.length == 0) {
        this.checkPassword = true
      } else {
        this.checkPassword = false
      }
    },
    checkValidation () {
      if (this.password.length >= 6 || this.password.length == 0) {
        this.validation = true
      } else {
        this.validation = false
      }
    }
  }
}
</script>

<style scoped>
.register{
  background-color: #ecf0f1;
  background-size: cover;
  height: 100%;
}
li{
  margin-right:10px;
}
</style>
