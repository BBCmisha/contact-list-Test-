<template>
    <div class="contact-info">
        <!-- Wrapper for contact info -->
        <div class="contact-info__wrapper">
            <h1 class="contact-info__title">Contact info</h1>

            <app-button class="mr-5" @click="goHome">Go Back</app-button>
            <app-button class="error" @click="stepBackward">Step backward</app-button>

            <div class="contact-info__item" v-for="(value, name) in contact.info" :key="name">
                <span class="contact-info__name">{{ name }}:</span>
                <span class="contact-info__value">{{ value }}</span>
                <div class="contact-info__activities">
                    <app-button
                      class="mr-5"
                      @click="showEditModal = true; keyForEdit = name; editedInfoName = name; editedInfoValue = value"
                    >Edit</app-button>
                    <app-button
                      class="error"
                      @click="showDeleteVerification = true; keyForDeleting = name"
                    >Delete</app-button>
                </div>
            </div>

            <app-verification-popup
              v-if="showDeleteVerification"
              @yes="deleteContactInfo"
              @no="showDeleteVerification = false"
            ></app-verification-popup>

            <app-floating-button @click="showModal = true">Add</app-floating-button>
        </div>

        <!-- Block for adding new information -->
        <app-popup v-if="showModal">
            <h3 class="app-popup__title">Create contact info</h3>

            <div class="app-input__block">
                <input
                  class="app-input"
                  type="text"
                  v-model="infoName"
                  placeholder="Name"
                >
                <span class="app-input__message" v-if="infoNameError">Enter info name</span>
            </div>

            <div class="app-input__block mt-15">
                <input
                  class="app-input"
                  type="text"
                  v-model="infoValue"
                  placeholder="Value"
                >
                <span class="app-input__message" v-if="infoValueError">Enter info value</span>
            </div>

            <app-button
              class="mt-15"
              @click="createContactInfo"
            >Ok</app-button>
        </app-popup>

        <!-- Block for editing contact information -->
        <app-popup v-if="showEditModal">
            <h3 class="app-popup__title">Edit contact info</h3>

            <div class="app-input__block">
                <input
                  class="app-input"
                  type="text"
                  v-model="editedInfoName"
                  placeholder="Name"
                >
                <span class="app-input__message" v-if="infoNameError">Enter info name</span>
            </div>

            <div class="app-input__block mt-15">
                <input
                  class="app-input"
                  type="text"
                  v-model="editedInfoValue"
                  placeholder="Value"
                >
                <span class="app-input__message" v-if="infoValueError">Enter info value</span>
            </div>

            <div class="mt-15">
                <app-button
                  class="mr-5"
                  @click="editContactInfo"
                >Ok</app-button>
                <app-button @click="showEditVerification = true">Close</app-button>
            </div>

            <app-verification-popup
              v-if="showEditVerification"
              @yes="showEditModal = false; showEditVerification = false; resetErrors()"
              @no="showEditVerification = false"
            ></app-verification-popup>
        </app-popup>
    </div>
</template>

<script>
import AppButton from '@/components/app-button.vue'
import AppFloatingButton from '@/components/app-floating-button.vue'
import AppPopup from '@/components/app-popup.vue'
import AppVerificationPopup from '@/components/app-verification-popup.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
    name: 'contact-info',
    data: () => {
        return {
            showModal: false,
            showEditModal: false,
            showDeleteVerification: false,
            showEditVerification: false,
            infoName: '',
            infoValue: '',
            editedInfoName: '',
            editedInfoValue: '',
            infoNameError: false,
            infoValueError: false,
            keyForDeleting: '',
            keyForEdit: '',
            copyInfo: null
        }
    },
    methods: {
        ...mapMutations([
            "deleteContactInfoRow",
            "createContactInfoRow",
            "editContactInfoRow",
            "changeInfo"]),
        createContactInfo() {
            if (this.contact.info[this.infoName]) {
                this.infoNameError = true
            } else if (this.checkInputs(this.infoName, this.infoValue)){
                this.createCopy()
                this.createContactInfoRow({
                    id: this.contact.id,
                    name: this.infoName,
                    value: this.infoValue})
                this.showModal = false
                this.infoName = ''
                this.infoValue = ''
            }
        },
        deleteContactInfo() {
            this.createCopy()
            this.deleteContactInfoRow({id: this.contact.id, key: this.keyForDeleting})
            this.keyForDeleting = ''
            this.showDeleteVerification = false
        },
        editContactInfo() {
            if (this.checkInputs(this.editedInfoName, this.editedInfoValue)) {
                this.createCopy()
                this.editContactInfoRow({
                    id: this.contact.id,
                    key: this.keyForEdit,
                    newKey: this.editedInfoName,
                    newValue: this.editedInfoValue
                })
                this.showEditModal = false
                this.editedInfoName = ''
                this.editedInfoValue = ''
            }
        },
        stepBackward() {
            if (this.copyInfo) {
                this.changeInfo({
                    id: this.contact.id,
                    newInfo: this.copyInfo})
                this.copyInfo = null
            }
        },
        goHome() {
            this.$router.push({ name: 'contact-list' })
        },
        checkInputs(nameInput, valueInput) {
            if (!nameInput || nameInput === " ") {
                this.infoNameError = true
                return false
            }
            if (!valueInput || valueInput === " ") {
                this.infoValueError = true
                return false
            }

            this.resetErrors()
            return true
        },
        resetErrors() {
            this.infoNameError = false
            this.infoValueError = false
        },
        createCopy() {
            this.copyInfo = Object.assign({}, this.contact.info)
        }
    },
    computed: {
        ...mapGetters(["getContactById"]),
        contact() {
            const id = Number(this.$route.params.id);
            return this.getContactById(id);
        }
    },
    components: {
        AppButton,
        AppFloatingButton,
        AppPopup,
        AppVerificationPopup
    }
}
</script>
