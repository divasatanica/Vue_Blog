<template>
  <div class="layer" @mousewheel.prevent>
    <div class="input-topbar"></div>
    <div class="input-container">
      <div class="input-row">
        <label for="user">用户名:</label>
        <input type="text" v-model="user">
      </div>
      <div class="input-row">
        <label for="user">密码:</label>
        <input type="password" v-model="pswd">
      </div>
      <div class="btn-set">
        <button @click="login">确定</button>
        <button @click="back">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      pswd: ''
    }
  },
  methods: {
    login() {
      if(this.user && this.pswd) {
        let data = {name: this.user, password: this.pswd};
        this.$http.post('http://comacc.top/login/', data, {credentials: true}).then((response) => {
          bus.$emit('loginner', this.user);
          this.back();
        }).catch((err) => {
          console.error(err);
        })
      }
      else {
        this.$message.error('用户名和密码不能为空');
      }
    },
    back() {
      window.history.back();
    }
  }
}
</script>

<style lang="scss" scoped>
  label {
    display: inline-block;
    width: 60px;
    text-align: right;
  }
  button {
    width: 100px;
    padding: 5px 8px;
    border: none;
    cursor: pointer;
    background: {
      color: #ddd;
    }
    color: #48576a;
  }
  button:hover {
    background: {
      color: #eee;
    }
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
  }
  .input-topbar {
    width: 500px;
    height: 30px;
    margin: 200px auto;
    margin-bottom: 0;
    background: {
      color: #7b7269;
    }
    border: {
      top-left-radius: 5px;
      top-right-radius: 5px;
    }
  }
  .input-container {
    width: 500px;
    height: 200px;
    margin: 0 auto;
    background-color: rgb(195,190,186)
  }
  .input-row {
    height: 50px;
    width: 100%;
    line-height: 50px;
    padding: {
      left: 100px;
    }
    color: #48576a;
  }
  .btn-set {
    padding: {
      right: 50px;
    }
    margin: {
      top: 40px;
    }
    text-align: right;
  }
</style>
