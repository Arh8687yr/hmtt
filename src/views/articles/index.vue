<template>
  <el-card class="box">
    <el-card>
      <bread-crumb slot="header">
        <span slot="title">内容列表</span>
      </bread-crumb>
      <el-form>
        <el-form-item>
          <template>
            <el-radio-group v-model="formData.status" @change="refreshList">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <span>频道列表：</span>
            <el-select v-model="formData.channel_id" placeholder="请选择" @change="refreshList">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <span>时间选择：</span>
            <el-date-picker
            @change="refreshList"
            value-format="yyyy-MM-dd"
            v-model="formData.dateRange"
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
      <div class="top">
        <span style="padding-left:10px;">共找到{{page.total}}条数据</span>
      </div>
      <div class="bottom">
        <div class="list" v-for="(item,index) in lists" :key="index">
          <div class="left">
            <div class="bgimg">
              <img :src="item.cover.images[0] ? item.cover.images[0]:baseURL" alt />
            </div>
            <div class="info">
              <p>{{item.title}}</p>
              <el-tag :type='item.status | statusType'>{{item.status | ArtStatus}}</el-tag>
              <p>{{item.pubdate}}</p>
            </div>
          </div>
          <div class="right">
            <a href="javascript:;">
              <i class="el-icon-edit"></i>修改
            </a>
            <a href="javascript:;" @click="del(item)">
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
      lists: [],
      baseURL: require('../../assets/img/404.png'), // require将默认地址转为base64
      // 定义无图时默认现实的图片
      page: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      options: [],
      // 搜索条件框的数据
      formData: {
        status: 5,
        channel_id: null,
        dateRange: null
      }
    }
  },
  methods: {
    del (item) {
      // 删除
      this.$confirm('您确定删除吗', '提示').then((res) => {
        console.log(res)

        this.$axios({
          method: 'delete',
          url: `/articles/${item.id.toString()}`
        }).then((res) => {
          // this.getList(this.getContitions())
        })
      })
    },

    getContitions () {
      // 将判断条件封装为函数
      let { status, channel_id: cid, dateRange } = this.formData // 将formData解构赋值 将结构的channel_id得值再赋值给cid
      let params = {
        status: status === 5 ? null : status,
        channel_id: cid,
        begin_pubdate: dateRange && dateRange.length ? dateRange[0] : null,
        end_pubdate: dateRange && dateRange.length > 1 ? dateRange[1] : null
      }
      params.page = this.page.currentPage
      params.par_page = this.page.pageSize
      // 合并参数
      return params
    },

    changePage (newPage) {
      // 获取当前点击页的内容
      this.page.currentPage = newPage
      // 如果点击了其他页，需要判断是否有条件，所以需要在执行一次条件，此时将条件封装为函数
      // let condition = this.getContitions()
      // 获取其他页判断条件

      this.getList(this.getContitions())
    },

    // 搜索条件框发生改变事件
    refreshList () {
      // 当筛选条件改变时，将页码回到第一页
      this.page.currentPage = 1
      let params = this.getContitions()
      this.getList(params)
    },

    getChannels () {
      // 获取频道列表
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.options = res.data.channels // 获取频道列表
      })
    },

    getList (params) {
      // 将文章当前页与文章每页显示的条数作为对象 打散后拼接到url上
      // let Params = {
      //   page: this.page.currentPage,
      //   per_page: this.page.pageSize
      // }
      // 请求文章内容
      this.$axios({
        url: '/articles',
        params: {
          ...params
        }
      }).then(result => {
        this.lists = result.data.results // 获取文章列表
        this.page.total = result.data.total_count // 获取文章总条数
      })
    }
  },
  filters: {
    // 定义过滤器 来返回文章状态
    ArtStatus (value) {
      // valus为传过来的status的值
      switch (value) {
        case 0:
          return '草稿'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },

    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        case 4:
          return 'info'
      }
    }
  },
  created () {
    this.getList({ page: 1, par_page: 10 })
    this.getChannels() // 获取频道列表
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
        }
      }
    }
  }
}
</style>
