<template>
  <div class="hello"  style="height:100%; padding:0.1% 0 0 0;">
    <div class="row">
      <div class="col s4" style="margin:2.3% 0 0 60%;">
        <form class="col s12">
          <h4 style="text-align:left"> <b>Sign In</b> </h4>
          <div class="row">
            <div class="input-field col s12" style="padding-right:15px;">
              <input id="email" type="email" class="validate" v-model='email'>
              <label for="email">Email</label>
            </div>
            <div class="input-field col s12" style="padding-right:15px;">
              <input id="password" type="password" class="validate" v-model='password'>
              <label for="password">Password</label>
            </div>
          </div>
          <a class="btn btn-block" style="width:100%; color:white" @click='login'>Sign In</a>

          <br>
          <p> <b>New User? </b> <a @click='registerPage' style="color:#01579b; cursor: pointer;"> <u>Sign Up here</u> </a> </p>
          <br>
          <hr>
          <p>or Sign In with :</p>
          <nav class="navmedia">
            <ul>
            <li><a class="btn tooltip btn-block socmed" data-position="bottom" data-tooltip="I am a tooltip" style="background-color:#192a56;" @click='steamSignIn'>
            <i class="fab fa-steam-square"></i><span class="tooltiptext">Steam</span></a></li>
            <li><a class="btn tooltip btn-block socmed" style="background-color:#000000;" @click='loginGithub'>
            <i class="fab fa-github-square"></i><span class="tooltiptext">Github</span></a></li>
            <li><g-signin-button
              class="btn tooltip btn-block socmed"
              style="background-color:#e55039;"
              :params="googleSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              <i class="fab fa-google-plus-square"></i><span class="tooltiptext">Google</span>
            </g-signin-button></li>
            <li><a class="btn tooltip btn-block socmed" style="background-color:#3867d6;" @click="loginfb">
              <i class="fab fa-facebook-square"></i><span class="tooltiptext">Facebook</span></a></li>
            </ul>
          </nav>

        </form>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Homepage',
  created () {
    if (localStorage.hasOwnProperty('authorization')) {
      this.$router.push('todo')
    } else {
      (function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '223165648453545',
          cookie: true,
          xfbml: true,
          version: 'v2.8'
        })
      }
    }
  },
  data () {
    return {
      email: '',
      password: '',
      googleSignInParams: {
        client_id: '108913565945-7db24779940ae01k701aniiue3cmj5se.apps.googleusercontent.com'
      }
    }
  },
  methods: {
    login () {
      // manual login
      const UserData = {
        email: this.email,
        password: this.password
      }
      axios({
        method: 'post',
        url: 'http://35.240.145.166/users/login',
        data: UserData
      }).then((response) => {
        const token = JSON.stringify(response.data.jwtToken)
        localStorage.setItem('authorization', token)
        this.$router.push('todo')
        this.email = ''
        this.password = ''
        swal({
          icon: 'success',
          title: "Welcome",
          text: `Signed In successfully!`,
          buttons: false,
          timer: 1000,
          position: 'top-end'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    onSignInSuccess (googleUser) {
      // google login
      const profile = googleUser.getBasicProfile()
      const userData = {
        google_id: profile.getId(),
        username: profile.getName(),
        user_image: profile.getImageUrl(),
        email: profile.getEmail()
      }
      axios({
        method: 'post',
        url: 'http://35.240.145.166/users/loginGoogle',
        data: userData
      }).then((response) => {
        const token = JSON.stringify(response.data.jwtToken)
        localStorage.setItem('authorization', token)
        this.$router.push('todo')
        swal({
          icon: 'success',
          title: "Welcome",
          text: `Signed In successfully!`,
          buttons: false,
          timer: 1000,
          position: 'top-end'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    },
    loginGithub () {
      // github login
      OAuth.initialize('5OU1Jyi98m-60jlbbcbmvHIAHug')
      OAuth.popup('github').then((github) => {
        github.me().then((data) => {
          const userData = {
            user_id: data.id,
            user_email: data.email,
            user_name: data.name
          }
          axios({
            method: 'post',
            url: 'http://35.240.145.166/users/loginGithub',
            data: userData
          }).then(response => {
            const token = JSON.stringify(response.data.jwtToken)
            localStorage.setItem('authorization', token)
            this.$router.push('todo')
            swal({
              icon: 'success',
              title: "Welcome",
              text: `Signed In successfully!`,
              buttons: false,
              timer: 1000,
              position: 'top-end'
            })
          }).catch(err => {
            console.log(err)
          })
        })
      })
    },
    loginfb () {
      let self = this
      window.FB.login((response) => {
        if (response.status === 'connected') {
          FB.api(`/me`, {
              fields: ['email', 'picture', 'name']
          }, function (profile) {
            axios({
              method: 'post',
              url: 'http://35.240.145.166/users/loginFb',
              headers: profile
            }).then((response) => {
              const token = JSON.stringify(response.data.jwtToken)
              localStorage.setItem('authorization', token)
              self.$router.push('todo')
              swal({
                icon: 'success',
                title: "Welcome",
                text: `Signed In successfully!`,
                buttons: false,
                timer: 1000,
                position: 'top-end'
              })
            }).catch((err) => {
              console.log(err)
            })
          })
        }
      })
    },
    statusChangeCallback(response) {
      let self = this
      FB.api(`/me`, {
          fields: ['email', 'picture', 'name']
      }, function (profile) {
        axios({
          method: 'post',
          url: 'http://35.240.145.166/users/loginFb',
          headers: profile
        }).then((response) => {
          console.log('Welcome!  Fetching your information.... ')
          return response
        }).catch((err) => {
          console.log(err)
        })
      })
    },
    steamSignIn () {
      // steam login
      axios({
        method: 'get',
        url: 'http://35.240.145.166/users/steam/authenticate'
      }).then(response => {
        var myWindow = window.open(response.data, 'myWindow', 'width=500,height=700')
        setTimeout(function () {
          myWindow.close()
        }, 60000)
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
    registerPage () {
      this.$router.push('register')
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

.navmedia{
  padding: 0 5 0 0;
  background-color: transparent;
  border: none;
  margin-bottom: 13%;
}

.socmed{
  height:50px;
  width: 81.5px;
  text-align: center;
  font-size: 50px;
  margin:9% 0 5px 20%;
}

li{
  margin-right:10px;
}
.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 12px;
}

.tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
}
</style>
