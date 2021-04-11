<template>
    <div class="app-verification-popup">
        <h3 class="app-verification-popup__title">Are you sure?</h3>
        <div class="app-verification-popup__activities">
            <app-button class="mr-5" @click="$emit('yes')">Yes</app-button>
            <app-button @click="$emit('no')">No</app-button>
        </div>
    </div>
</template>

<script>
import AppButton from '@/components/app-button.vue'

export default {
    name: 'app-verification-popup',
    components: {
        AppButton
    }
}
</script>