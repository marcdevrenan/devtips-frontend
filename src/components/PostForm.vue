<template>
    <div v-if="isModalOpen" class="modal-wrapper">
        <div class="overlay"></div>
        <div class="modal-content margin-left">
            <form class="p-5 border rounded bg-white w-50 mx-auto">
                <div>
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn-close col-md-2" aria-label="Close" @click="closeSelf"></button>
                    </div>
                    <h4 class="col-md-10">Tell us about...</h4>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="title" type="text" class="form-control" id="title" placeholder="Lorem Ipsum">
                    <label for="title">Title</label>
                </div>
                <div class="form-floating mb-3">
                    <textarea v-model="content" type="text-area" class="form-control" id="content" placeholder="Tell us your newest tip..."></textarea>
                    <label for="content">Content</label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="button" @click="createPost">Post</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import axios from 'axios';

interface IModalFormProps {
  isModalOpen: boolean
}

const { isModalOpen } = defineProps<IModalFormProps>();
const userStore = useUserStore()

const title = ref("")
const content = ref("")
const rate = ref(0)
const publishDate = new Date().toISOString
const userId = userStore.userId;

const createPost = async () => {
    try {
        await axios.post("https://localhost:7096/api/Post", 
        { title: title.value, content: content.value, rate: rate.value, publishDate, userId: userId });

        closeSelf();
    } catch (error) {
        console.error(error);
    }
}

const emit = defineEmits(['hideModal']);

const closeSelf = () => {
  emit('hideModal');
};
</script>

<style>
.modal-wrapper {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: 999;
}
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
}
.modal-content {
    position: fixed;
    padding: 0.5rem;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 999;
}
</style>