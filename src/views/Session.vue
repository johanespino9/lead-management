<template>
  <div>
    <h2>Session Page</h2>
    <form @submit="login">
      <div>
          <input placeholder="Your email" type="email" v-model="email">
      </div>
      <div>
          <input placeholder="Password" type="password" v-model="password">
      </div>
      <div>
          <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        email : "",
        password : ""
      }
    },
    methods: {
      Session: function () {
        const email = this.email 
        const password = this.password
        this.$store.dispatch('Session', { email, password }).then(() => this.$router.push('/'))
      }
    }
  }
</script>