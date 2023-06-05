<template>
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
        <div class="row align-items-center g-lg-5 py-5">
            <div class="col-lg-7 text-center text-lg-start">
                <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">DEVTips Login</h1>
                <p class="col-lg-10 fs-4">
                    Welcome back to DEVTips!
                    Log in to access your account and continue exploring our developer-only content.
                    Reconnect with the community and keep learning and sharing knowledge on DEVTips.
                    Let's start!
                </p>
            </div>
            <div class="col-md-10 mx-auto col-lg-5">
                <form class="p-4 p-md-5 border rounded-3 bg-body-tertiary">
                    <div class="form-floating mb-3">
                        <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button class="w-100 btn btn-lg btn-primary" type="button" @click="login">Login</button>
                    <hr class="my-4">
                    <small class="text-body-secondary">New on DEVTips? <a href="/register">Register here</a>.</small>
                </form>
            </div>  
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import router from '@/router';

const email = ref("")
const password = ref("")
const userStore = useUserStore()

const login = async () => {
    try {
        // chamar o endpoint de login na API usando o Axios
        const response = await axios.post("https://localhost:7096/api/Auth/login", 
        { email: email.value, password: password.value});

        // armazenar o token retornado no estado usando o store
        userStore.setToken(response.data.token);

        // redirecionar para a página inicial
        router.push("/");
    } catch (error) {
        console.error(error);
    }
}
</script>