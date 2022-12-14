<template>
    <Render :content="content" />
</template>

<script setup>
import Render from '../render/Render.vue'
defineProps({
    content: Array
})
</script>
