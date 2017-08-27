<template>
  <div class="index-passage-container">
    <div class="passage-container-topbar"></div>
    <div class="passage-func-zone">
      <div class="passages">
        <single v-for="(item, index) in articles" :key="item._id" :article="item" ></single>
      </div>
      <div class="side-bar"></div>
    </div>
  </div>
</template>

<script>
import single from '@/components/index-passage-single'
export default {
  data() {
    return {
      articles:[]
    }
  },
  methods: {
    req() {
      this.$http.get('http://comacc.top/article/newest/?offset=0').then(response => {
        for(let i in response.data) {
          this.articles.push(response.data[i]);
        }
      }, (err) => {
        console.error(err);
      })
    },
    checkPassage(index) {

    }
  },
  components: {
    single
  },
  created() {
    this.req();
  }
}
</script>

<style lang="scss" scoped>
  .index-passage-container {
    width: 1100px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    box-shadow: 5px 9px 10px 0 rgba(40,40,40,0.4);
  }
  .passage-container-topbar {
    width: 100%;
    height: 40px;
    background: {
      color: #494949;
    }
    border: {
      top-left-radius: 5px;
      top-right-radius: 5px;
    }
  }
  .passage-func-zone {
    display: flex;
  }
  .passages {
    width: 60%;
    border: none;
  }
  .side-bar {
    width: 40%;
    border: none;
    background-color: rgba(195,190,186,0.7);
  }
</style>
