<template>
  <el-card class="box">
    <el-card>
      <bread-crumb slot="header">
        <span slot="title">内容列表</span>
      </bread-crumb>
      <el-form>
        <el-form-item>
          <template>
            <span>文章状态：</span>
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <span>频道列表：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <span>时间选择：</span>
            <el-date-picker
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              default-value="2010-10-01"
            ></el-date-picker>
          </template>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="container">
      <div class="top">共找到123456条数据</div>
      <div class="bottom">
        <div class="list" v-for="(item,index) in lists" :key="index">
          <div class="left">
            <div class="bgimg">
              <img :src="item.cover.images[0] ? item.cover.images[0]:baseURL" alt />
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <span>{{item.status}}</span>
              <p>{{item.pubdate}}</p>
            </div>
          </div>
          <div class="right">
            <a href="javascript:;">
              <i class="el-icon-edit"></i>修改
            </a>
            <a href="javascript:;">
              <i class="el-icon-delete"></i>删除
            </a>
          </div>
        </div>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:20px 0">
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :total="page.total"
        :current-page="page.currentPage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      lists: [],
      baseURL: require('../../assets/img/404.png'), // require将默认地址转为base64
      // 定义无图时默认现实的图片
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  methods: {
    changePage (newPage) {
      // 获取当前点击页的内容
      this.page.currentPage = newPage
      this.getList()
    },
    getList () {
      // 将文章当前页与文章每页显示的条数作为对象 打散后拼接到url上
      let Params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      // 请求文章内容
      this.$axios({
        url: '/articles',
        params: {
          ...Params
        }
      }).then(result => {
        this.lists = result.data.results // 获取文章列表
        this.page.total = result.data.total_count // 获取文章总条数
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.box {
  background-color: rgb(242, 243, 245);
  .container {
    margin-top: 15px;
    border: 1px solid #ccc;
    // height: 100vh;
    background-color: #fff;
    .top {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px dashed #ccc;
    }
    .bottom {
      // height: 100vh;
      .list {
        height: 150px;
        padding: 10px;
        border-bottom: 1px dashed #ccc;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .bgimg {
            width: 180px;
            height: 130px;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            span {
              width: 60px;
              height: 30px;
              margin: 30px 0;
              line-height: 30px;
              text-align: center;
              display: block;
              color: #409eff;
              border-radius: 4px;
              background-color: rgba(64, 158, 255, 0.1);
              border: 1px solid rgba(64, 158, 255, 0.2);
            }
          }
        }
      }
    }
  }
}
</style>
