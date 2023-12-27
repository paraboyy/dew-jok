<!-- Login.vue -->
<template>
  <div class="container col-md-6 m-auto">
    <h2>Login</h2>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleFormControlInput1">
    </div>

    <div>
      <button type="submit" class="btn btn-primary">Login</button>
    </div>
    
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios.post('http://localhost:8000/api/login', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error.response.data);
      });
    },
  },
};
</script>