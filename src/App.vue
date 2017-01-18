<template>
  <div id="app">
    <div class="row row--nowrap">
      <input
        type="text"
        v-model="url"
        class="cf-form-input flex--grow"
        @keyup.enter="fetch"
      >
      <button
        @click="fetch"
        class="cf-btn-primary"
      >
        Fetch
      </button>
    </div>

    <json-editor
      :initial-data="data"
      @change="update"
      disabled="id,slug,url,type"
    />
  </div>
</template>

<script>
import {resolve} from 'lib/resolveables'
import JsonEditor from 'components/JsonEditor'

export default {
  name: 'app',
  components: { JsonEditor },
  data () {
    return {
      url: '',
      data: {},
      api: null
    }
  },
  mounted () {
    const cfExt = window.contentfulExtension || window.contentfulWidget
    cfExt.init(api => {
      this.api = api
      api.window.startAutoResizer()
      this.data = api.field.getValue()
      if (this.data && this.data.url) {
        this.url = this.data.url
      }
    })
  },
  methods: {
    fetch () {
      resolve(this.url).then(v => {
        this.data = v
      })
    },
    update (newVal) {
      this.data = newVal
      if (this.api) {
        this.api.field.setValue(this.data)
        if (this.api.entry.fields.title) {
          this.api.entry.fields.title.setValue(this.data.title)
        }
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  display: flex;
  flex-flow: column nowrap;
}
input {
  margin: 0.5rem;
}
.row {
  display: flex;
  flex-direction: row;
}
.row--wrap {
  flex-wrap: wrap;
}
.row--nowrap {
  flex-wrap: nowrap;
}
.row--vcenter {
  align-items: center;
}
.flex--grow {
  flex-grow: 1;
}
</style>
