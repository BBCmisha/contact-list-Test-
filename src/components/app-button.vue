<template>
    <button class="app-button" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'app-button'
}
</script>