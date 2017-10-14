<template>
  <div class="post-container">
    <edit v-on:inputed="update" v-on:header="updateHeader" v-on:posted="clear" v-bind:api = "api"></edit>
    <preview :header="header" :content="content" ></preview>
  </div>
</template>

<script>
import edit from './post-edit';
import preview from './post-preview';
import api from '../../../data/api'
export default {
  data() {
    return {
      header: '',
      content: '',
      api: api.address
    }
  },
  components: {
    edit,
    preview
  },
  methods: {
    update(data) {
      this.content = data;
    },
    updateHeader(data) {
      this.header = data;
    },
    clear() {
      this.content = '';
      this.header = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .post-container {
    width: 98%;
    max-height: 1000px;
    margin: 5rem auto;
    background: {
      color: rgba(255,255,255,0.5);
    }
    overflow: hidden;
  }
</style>
