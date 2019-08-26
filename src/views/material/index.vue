<template>
  <el-card>
    <!-- 引入全局面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>

    <div class="tabs">
      <el-upload class="upload" :show-file-list="false" action :http-request="uploadImg">
        <el-button type="primary">上传图片</el-button>
      </el-upload>
      <!-- 引用tabs标签页组件 -->
      <el-tabs v-model="activeName" @tab-click="tabchange">
        <el-tab-pane label="全部" name="all">
          <div class="box">
            <div class="card" v-for="item in list" :key="item.id">
              <img :src="item.url" alt class="img" />
              <div class="icon">
                <i
                  class="el-icon-star-off"
                  @click="saveOr(item)"
                  :style="{color:item.is_collected?'red':''}"
                ></i>
                <i class="el-icon-delete" @click="del(item)"></i>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏" name="save">
          <div class="box">
            <div class="card" v-for="item in list" :key="item.id">
              <img :src="item.url" alt class="img" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 引入分页组件 -->
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
      // 默认选中第一个tab标签
      activeName: 'all',
      list: [],
      page: {
        pageSize: 15,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    getList () {
      let pageList = {
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'save',
          ...pageList
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        // 获取文章总条数
      })
    },
    changePage (newPage) {
      // 分页获取当前点击页
      this.page.currentPage = newPage
      this.getList()
    },
    tabchange () {
      // 切换标签栏事件
      this.getList()
    },
    saveOr (item) {
      // 点击收藏事件
      this.$confirm(
        `您确定要${item.is_collected ? '收藏' : '取消收藏'}吗？`,
        '提示'
      ).then(() => {
        this.$axios({
          method: 'put',
          url: `/user/images/${item.id}`,
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getList()
        })
      })
    },
    del (item) {
      // 点击删除事件
      this.$confirm('您确定要删除吗？', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/user/images/${item.id}`
        }).then(result => {
          this.getList()
        })
      })
    },
    uploadImg (params) {
      console.log(params)
      let data = new FormData()
      data.append('image', params.file)
      // 点击上传事件
      this.$axios({
        method: 'post',
        url: '/user/images',
        data
      }).then(() => {
        this.$message({
          message: '吕宝双是狗',
          type: 'success'
        })
        this.getList()
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.tabs {
  position: relative;
  .box {
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    flex-wrap: wrap;
    .card {
      flex: 20%;
      width: 150px;
      height: 180px;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 20px;
      .img {
        width: 150px;
        height: 140px;
        vertical-align: middle;
      }
      .icon {
        height: 40px;
        width: 150px;
        background-color: #f4f5f6;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .upload {
    position: absolute;
    z-index: 2;
    right: 15px;
    top: -10px;
  }
}
</style>
