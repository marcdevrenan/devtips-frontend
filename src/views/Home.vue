<template>
    <nav class="sticky-top" data-bs-theme="dark">
        <div class="navbar navbar-dark bg-dark shadow-sm">
            <div class="container">
                <span class="navbar-brand d-flex align-items-center"><strong>DEVTips</strong></span>
                <div class="d-flex align-items-center">
                    <input v-model="searchKeyword" type="text" class="form-control me-3" placeholder="Search for something..." />
                </div>
                <button class="btn btn-outline-danger my-2 my-sm-0" aria-controls="navbarHeader" type="button" @click="logout">Logout</button>
            </div>
        </div>
    </nav>
    <main>
        <PostForm :isModalOpen="showModal" @hideModal="closeModal" />
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1 class="fw-light">Welcome to <strong>DEVTips</strong>!</h1>
                    <p class="lead text-body-secondary">
                        A platform dedicated to the exchange of experiences between software developers.
                        Here, you will find valuable tips and insights about the most diverse experiences and programming practices.
                        Thanks for joining our community.
                        Let's build a bright future for software development.
                    </p>
                    <p>
                        <button type="button" class="btn btn-primary my-2" @click="openModal">Share a Learning</button>
                    </p>
                </div>
            </div>
        </section>
        <div class="album py-5 bg-body-tertiary">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <PostCard v-for="post in searchResults" :key="post.id" :post="post" />
                </div>
            </div>
        </div>
    </main>
    <footer class="text-body-secondary py-5">
        <div class="container">
            <p class="float-end mb-1"><a href="#">Back to top</a></p>
            <p class="mb-1"><strong>Course Subject:</strong> Projeto de Bloco</p>
            <p class="mb-1"><strong>Stakeholder:</strong> Carlos Pivotto</p>
            <p class="mb-1"><strong>Developer:</strong> Renan Marcilio</p>
            <p class="float-end mb-0">Project developed for <a href="https://www.infnet.edu.br/infnet/instituto/">Infnet Institute</a></p>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import PostForm from '@/components/PostForm.vue';
import PostCard from '@/components/PostCard.vue';
import type { Post } from '@/types/Post';
import axios from 'axios';

const userStore = useUserStore()
const isModalOpen = ref(false)
const showModal = ref(false)
const openModal = () => showModal.value = true;
const closeModal = () => {
    showModal.value = false;
    getPosts();
}

const posts = ref<Post[]>([]);
const searchKeyword = ref("");
const searchResults = ref<Post[]>([]);

const logout = () => {
    // limpar o token do estado usando o store
    userStore.logout();

    // redirecionar para a página de login
    router.push("/login");
}

const search = () => {
    searchResults.value = posts.value.filter(item => 
        item.content.toLowerCase().includes(searchKeyword.value.toLowerCase()));
}

watch(searchKeyword, () => {
    search();
});

const getPosts = async () => {
    try {
        const response = await axios.get("https://localhost:7096/api/Post");
        posts.value = response.data;
        searchResults.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

onMounted(async () => {
    isModalOpen.value = false;
    
    if (userStore.isAuthenticated) {
        getPosts();
    }
})
</script>