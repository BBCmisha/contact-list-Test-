<template>
    <div class="contact-block">
        <span class="contact-block__id">
            {{ contact.id }}
        </span>
        <span class="contact-block__name">
            {{ contact.info["name"] }}
        </span>
        <div class="contact-block__activities">
            <app-button class="mr-5" @click="detailedInfo">Info</app-button>
            <app-button class="error" @click="showVerification = true">Delete</app-button>
        </div>
        <app-verification-popup
          v-if="showVerification"
          @yes="deleteThisContact"
          @no="showVerification = false"
        ></app-verification-popup>
    </div>
</template>

<script>
import AppButton from './app-button.vue'
import AppVerificationPopup from './app-verification-popup.vue'
import { mapMutations } from 'vuex';

export default {
    name: 'contact-block',
    props: {
        contact: {
            type: Object,
            required: true
        }
    },
    data: () => {
        return {
            showVerification: false
        }
    },
    methods: {
        ...mapMutations(["deleteContact"]),
        deleteThisContact() {
            this.deleteContact(this.contact.id)
        },
        detailedInfo() {
            this.$router.push({ name: 'contact-info', params: { id: this.contact.id }});
        }
    },
    components: {
        AppButton,
        AppVerificationPopup
    }
}
</script>