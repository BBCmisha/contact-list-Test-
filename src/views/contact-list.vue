<template>
  <div class="contact-list">
    <h1 class="contact-list__title">Contacts</h1>
    <h3 class="contact-list__subtitle" v-if="contacts.length === 0">Your contact list is empty</h3>

    <contact-block
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
    />

    <app-floating-button @click="showModal = true">Add</app-floating-button>

    <app-popup v-if="showModal">
      <h3 class="app-popup__title">Create contact</h3>

      <div class="app-input__block">
        <input
          class="app-input"
          type="text"
          v-model="contactNewName"
          placeholder="Name"
        >
        <span class="app-input__message" v-if="error">Enter contact name</span>
      </div>

      <app-button
        class="mt-15"
        @click="submit()"
      >Ok</app-button>
    </app-popup>
  </div>
</template>

<script>
import ContactBlock from '@/components/contact-block.vue'
import AppPopup from '@/components/app-popup.vue'
import AppButton from '@/components/app-button.vue'
import AppFloatingButton from '@/components/app-floating-button.vue'
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'contact-list',
  data: () => {
    return {
      showModal: false,
      error: false,
      contactNewName: ''
    }
  },
  methods: {
    ...mapMutations(["createContact"]),
    checkInput() {
      if (!this.contactNewName || this.contactNewName === " ") {
        this.error = true
        return false
      }
      this.error = false
      return true
    },
    submit() {
      if (this.checkInput()) {
        this.createContact(this.contactNewName)
        this.showModal = false
        this.contactNewName = ''
      }
    }
  },
  computed: {
    ...mapGetters(["getContacts"]),
    contacts() {
      return this.getContacts;
    },
  },
  components: {
    ContactBlock,
    AppPopup,
    AppButton,
    AppFloatingButton
  }
}
</script>
