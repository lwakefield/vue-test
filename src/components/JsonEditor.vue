<template>
  <div>
    <div v-for="(value, key) of data" class="row row--nowrap row--vcenter">
      <input
        type="text"
        :value="key"
        @input="updateKey(key, $event)"
        class="field-key cf-form-input"
        placeholder="Field Key"
        :disabled="isDisabled(key)"
      >
      <input
        type="text"
        v-model="data[key]"
        class="field-val cf-form-input"
        placeholder="Field Value"
        :disabled="isDisabled(key)"
      >
      <button
        class="cf-btn-secondary delete-btn"
        :disabled="isDisabled(key)"
        @click="deleteKey(key)"
      >
      <span>&times;</span>
      </button>
    </div>
    <button class="cf-btn-primary cf-block" @click="addField">
      + Add Field
    </button>
  </div>
</template>

<script>
export default {
  name: 'json-editor',
  props: ['initialData', 'disabled'],
  data () {
    return {
      data: this.intialData
    }
  },
  watch: {
    initialData (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.data = newVal
      }
    }
  },
  methods: {
    updateKey (oldKey, $event) {
      const newKey = $event.target.value
      const newData = {}
      for (const key in this.data) {
        newData[key === oldKey ? newKey : key] = this.data[key]
      }

      this.data = newData
      this.$emit('change', this.data)
    },
    deleteKey (key) {
      this.$delete(this.data, key)
    },
    addField () {
      this.$set(this.data, 'new-field', '')
    },
    isDisabled (key) {
      return this.disabled.split(',').indexOf(key) !== -1
    }
  }
}
</script>

<style>
.delete-btn--hide {
  visibility: hidden;
}
.field-key {
  max-width: 16rem;
}
.delete-btn {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

