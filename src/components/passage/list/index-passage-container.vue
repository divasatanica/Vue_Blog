<template>
  <div class="index-passage-container">
    <div class="passage-container-topbar"><span class="return-to" v-if="mode !== 1" @click="req()">退出筛选结果</span></div>
    <div class="passage-func-zone">
      <div class="passages">
        <single v-for="(item, index) in articles" :key="item._id" :article="item" @filtertag="filterByTag"></single>
      </div>
      <div class="side-bar">
        <div class="filter-date">
          <el-date-picker
            v-model="date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
          <button class="filter-date-btn" @click="filterByDate()">筛选</button>
        </div>
      </div>
    </div>
    <el-pagination
      small
      layout="prev, pager, next"
      :current-page="page"
      :total="total" :page-size="5" v-on:current-change="moreArticle">
    </el-pagination>
  </div>
</template>

<script>
import single from '@/components/passage/list/index-passage-single'
import api from '../../../data/api'
export default {
  data() {
    return {
      articles:[],
      page: 1,
      total: 0,
      date: '',
      mode: 1, //1为普通模式，2为日期筛选，3为标签筛选,
      tag2filter: ''
    }
  },
  methods: {
    req() {
        this.page = +this.$route.params.page;
        this.mode = 1;
        this.date = '';
        this.$http.get(`${api.address}/article/newest/${this.$route.params.page-1}`).then(this.renderPassages, (err) => {
          throw err;
        }).catch(this.alertTheError)
    },
    moreArticle(param) {
        if(this.mode == 1) {
          this.$router.push({name: 'passages', params: {page: param}})
          this.$http.get(`${api.address}/article/newest/${param-1}`).then(this.renderPassages, err => {
            throw err;
          }).catch(this.alertTheError)

        }
        else if(this.mode == 2) {
          this.filterByDate(param);
        }
        else if(this.mode == 3) {
          this.filterByTag(this.tag2filter, param);
        }
    },
    filterByDate(param = 1) {
      const dateParam = this.generate();
      const startDate = dateParam.startDate;
      const endDate = dateParam.endDate;
      this.mode = 2;
      this.$http.post(`${api.address}/article/filtering`, {
        startDate,
        endDate,
        page: param
      }).then(this.renderPassages, err => {
        throw err;
      }).catch(this.alertTheError);
    },
    filterByTag(tag, param = 1) {
      this.tag2filter = tag;
      this.mode = 3;
      this.$http.post(`${api.address}/article/filtering`, {
        tag,
        page: param
      }).then(this.renderPassages, err => {
        throw err;
      }).catch(this.alertTheError);
    },
    generate(){
      if(!this.date || !this.date[0] || !this.date[1]) {return;}
      let startDate = this.date[0];
      let endDate = this.date[1];
      startDate = `${startDate.getFullYear()}${((startDate.getMonth()+1)<10)?`0${startDate.getMonth()+1}`:`${startDate.getMonth()+1}`}${(startDate.getDate()<10)?`0${startDate.getDate()}`:`${startDate.getDate()}`}000`;
      endDate = `${endDate.getFullYear()}${((endDate.getMonth()+1)<10)?`0${endDate.getMonth()+1}`:`${endDate.getMonth()+1}`}${(endDate.getDate()<10)?`0${endDate.getDate()}`:`${endDate.getDate()}`}000`;
      return {startDate, endDate};
    },
    renderPassages(res) {
      if(res.data.code == 0) {
        this.articles = [];
        this.total = 1;
      }
      else {
        let article = res.data.article;
        this.total = res.data.length;
        this.articles = [];
        for(let i in article) {
          this.articles.push(article[i])
        }
      }
    },
    alertTheError(e) {
      console.log(e);
      this.$message({
              message: '网络出现问题π_π 请稍后再试',
              type: 'error',
              duration: 1500
          })
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
    width: 90%;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 50px;
    overflow: hidden;
  }
  .passage-container-topbar {
    width: 100%;
    height: 40px;
    background: {
      color: transparent;
    }
    border: {
      top-left-radius: 5px;
      top-right-radius: 5px;
    }
    .return-to {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      margin-left: 3rem;
      padding: {
        left: .5rem;
        right: .5rem;
      }
      color: #29272b;
      transition: all 0.2s ease;
      cursor: pointer;
      &:hover {
        background-color: rgba(200,200,200,0.3);
      }
    }
  }
  .passage-func-zone {
    display: flex;
    height: 510px;
    @media screen and (max-width: 700px) {
      flex-direction: column;
    }
  }
  .passages {
    width: 60%;
    border: none;
    height: 510px;
    background-color: rgba(255,255,255,0.4);
    @media screen and (max-width: 700px) {
      width: 100%;
    }
  }
  .side-bar {
    width: 40%;
    border: none;
    background-color: rgba(255,255,255,0.4);
    @media screen and (max-width: 700px) {
      width: 100%;
    }
    /* border: {
      left: 1px solid #a0a0a0;
    } */
  }
  .filter-date {
    padding-left: 1rem;
    margin-top: 25px;
    margin-bottom: 25px;
  }
  .filter-date-btn {
    width: 6rem;
    height: 2.2rem;
    // margin-left: 2rem;
    margin-right: 1rem;
    color: #fff;
    font-size: 1rem;
    transition: all 0.2s ease;
    background: {
      color: #808080;
    }
    border: 1px solid #808080;
    &:hover {
      border: 1px solid #a0a0a0;
    }
    &:active {
      transform: translateY(3px);
    }
  }
</style>
