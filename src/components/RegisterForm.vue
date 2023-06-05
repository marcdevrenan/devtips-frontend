<template>
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                    <div class="form-floating mb-3">
                        <input v-model="name" type="text" class="form-control" id="name" placeholder="Lorem Ipsum">
                        <label for="name">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="name@example.com">
                        <label for="email">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
                        <label for="password">Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="button" @click="register">Register</button>
                    <hr class="my-4">
                    <small class="text-body-secondary">Already a user? <a href="/login">Login here</a>.</small>
                </form>
            </div>  
            <div class="col-lg-7 text-center text-lg-start">
                <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">Welcome to DEVTips...</h1>
                <p class="col-lg-10 fs-4">
                    Join our network on DEVTips!
                    Connect with talented developers, share valuable knowledge,
                    join and stay up to date with many tips on software development.
                    Register now and join this amazing community!
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const name = ref("")
const email = ref("")
const password = ref("")

const register = async () => {
    try {
        // chamar o endpoint de registro na API usando o Axios
        await axios.post("https://localhost:7096/api/Auth/register", 
        { name: name.value, email: email.value, password: password.value});
        
        // redirecionar para a página de login
        router.push("/login");
    } catch (error) {
        console.error(error);
    }
}
</script>