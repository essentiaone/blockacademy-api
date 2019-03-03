<template>
  <div class="hello">
    <section class="form">
      <div class="field">
        <label class="label">Import private key</label>
          <input class="input" type="text" placeholder="Private key" v-model="privateKey">
        <button name="Save" value="Save" v-on:click="generateAddress">Save</button>
      </div>
        {{ address }}
      <div>
        Balance: {{ balance }}
      </div>
      <div>
        <input type="file" placeholder="Choose file">
        <button v-on:click="saveFile">Upload</button>
      </div>
    </section>
  </div>
</template>

<script>
  import { store } from "./SimpleStore";
  import ethUtil from 'ethereumjs-util'

  export default {
    name: 'SimpleApplication',
    computed: {
      privateKey: {
        get() {
          return store.state.privateKey
        },
        set(value) {
          store.state.privateKey = value
        }
      },
      balance () {
        return store.state.balance
      },
      fileName () {
        return store.state.fileName
      }
    },
    methods: {
      generateAddress() {
        this.address = this.privateKey
        store.dispatch("getBalance", '0xb7586945167e9271E2881E92c13F13a8Cc776406')
      },
      saveFile() {

      }
    },
    data: function () {
      return {
        address: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
