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
        Balance: {{ balance }} <button v-on:click="refreshBalance">Refresh</button>
      </div>
      <div>
        <input type="file" v-on:change="previewFiles($event)" ref="myFiles" placeholder="Choose file">
        <button v-on:click="saveFile">Upload</button>
      </div>
      <template v-if="filePath">
        <br/>
        <div>
          File path: {{ filePath }}
        </div>
        <br/>
        <div>
          File name: {{ fileName }}
        </div>
        <br/>
        <button v-on:click="downloadFile">Download</button>
      </template>
    </section>
  </div>
</template>

<script>
  import { store } from "./SimpleStore";
  import ethUtil from 'ethereumjs-util'
  import { mapMutations, mapActions } from 'vuex'

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
      },
      filePath () {
        return store.state.filePath
      }
    },
    methods: {
      generateAddress() {
        store.dispatch('generateAddress', this.privateKey)
        store.dispatch('getBalance')
      },
      async saveFile() {
        await store.dispatch('generateTransaction')
        await store.dispatch('uploadFile', this.file)
      },
      previewFiles(event) {
        let data = new FormData();
        let file = event.target.files[0];
        data.append('name', file.name)
        data.append('file', file)
        this.file = data
        store.dispatch('setFileName', file.name)
      },
      async downloadFile() {
        let file = await store.dispatch('downloadFile')
        let blob = new Blob([file], { type : 'text/plain' })
        let url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = this.fileName;
        a.click();
      },
      refreshBalance() {
        store.dispatch('getBalance')
      }
    },
    data: function () {
      return {
        address: null,
        fileToUpload: null,
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
