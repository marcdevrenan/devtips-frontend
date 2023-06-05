<template>
    <div class="col">
        <div class="card shadow-sm">
            <div class="card-header">Posted by: <strong>{{ post.author }}</strong></div> 
            <div class="card-body">
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text">{{ post.content }}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" @click="ratePost(post.id)" class="btn btn-sm btn-outline-secondary">Worth It?</button>
                    </div>
                    <small class="text-body-secondary">{{ formatDate(post.publishDate) }}</small>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import type { Post } from '@/types/Post';

defineProps<{ post: Post }>();

const formatDate = (date: string): string => {
    const publishDate = new Date(date)
    return formatDistanceToNow(publishDate, { addSuffix: true, includeSeconds: true });
}

const ratePost = async (id: string) => {
    try {
        await axios.put(`https://localhost:7096/api/Post/${id}`);
    } catch (error) {
        console.error(error);
    }
}
</script>