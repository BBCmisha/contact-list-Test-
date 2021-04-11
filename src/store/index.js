import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        id: 1,
        info: {
          "name": "John",
          "email": "john@test.com",
          "phone": "380734433881",
          "city": "Kyev"
        }
      },
      {
        id: 2,
        info: {
          "name": "Mike",
          "email": "mike@test.com",
          "language": "english"
        }
      },
    ]
  },
  mutations: {
    createContact(state, contactName) {
      let newId = (state.contacts.length === 0) ?
                  0 : state.contacts[state.contacts.length - 1].id + 1;
      let newContact = {
        id: newId,
        info: {
          "name": contactName
        }
      }

      state.contacts.push(newContact)
    },
    deleteContact(state, id) {
      let contactIndex = state.contacts.findIndex(item => item.id === id);
      state.contacts.splice(contactIndex, 1);
    },
    createContactInfoRow(state, {id, name, value}) {
      let obj = state.contacts.find(item => item.id === id)
      obj.info[name] = value
    },
    deleteContactInfoRow(state, {id, key}) {
      let obj = state.contacts.find(item => item.id === id)
      delete obj.info[key]
    },
    editContactInfoRow(state, {id, key, newKey, newValue}) {
      let info = state.contacts.find(item => item.id === id).info;

      if (key !== newKey) {
        Object.defineProperty(info, newKey,
          Object.getOwnPropertyDescriptor(info, key))
          delete info[key]
      }

      info[newKey] = newValue
    },
    changeInfo(state, {id, newInfo}) {
      let obj = state.contacts.find(item => item.id === id)
      obj.info = Object.assign({}, newInfo)
    }
  },
  actions: {
  },
  getters: {
    getContacts: (state) => {
      return state.contacts
    },
    getContactById: (state) => (id) => {
      return state.contacts.find(item => item.id === id)
    }
  },
  modules: {
  }
})
