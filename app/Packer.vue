<template>
    <Render :content="content" />
</template>

<script setup>
import Render from '../src/render/Render.vue'
defineProps({
    content: Array
})
</script>