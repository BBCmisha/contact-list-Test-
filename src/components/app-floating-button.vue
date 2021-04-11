<template>
    <button class="app-floating-button" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'app-floating-button'
}
</script>