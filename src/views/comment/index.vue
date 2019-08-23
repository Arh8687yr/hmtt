<template>
  <el-card>
    <!-- 将面包屑作为el-card的具名插槽 -->
    <bread-crumb slot="header">
      <span slot="title">评论列表</span>
    </bread-crumb>
    <!-- 引用element-ui table表格 -->
    <el-table :data="commentList">
      <!-- el-table-column为表格列  label为表头标题 -->
      <el-table-column label="标题" width="500" prop="title"></el-table-column>
      <el-table-column :formatter="formatter" label="评论状态" prop="comment_status"></el-table-column>
      <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
      <el-table-column label="修改评论">
        <template>
          <span>修改评论</span>
        </template>
      </el-table-column>
      <el-table-column label="开启/禁止评论">
        <template slot-scope="obj">
          <el-button @click="closeOpen(obj.row)" :style="{color:obj.row.comment_status?'#E6A23C':'#409'}" type="text">{{obj.row.comment_status?"禁止评论":"开启评论"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="1000"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      //  定义表格数据
      commentList: []
    }
  },
  methods: {
    getList () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment' // 查询评论相关的数据
        }
      }).then(result => {
        this.commentList = result.data.results
      })
    },
    formatter (row, column, cellValue, index) {
      // element-ui提供的方法，用来格式化内容（因为不支持将布尔值的数据显示到页面）
      // 因为需要接收返回值，所以必须返回
      // row: 当条数据对象
      // column: 当前列属性
      // cellVaule: 当前单元格属性值
      return cellValue ? '开启' : '禁止'
    },
    closeOpen (row) {
      // 设置评论状态是否开启
      let mess = row.comment_status ? '禁止' : '开启'
      this.$confirm(`确定要${mess}评论吗？`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getList()
        })
      })
    },
    changePage (newPage) {
      // current-change是分页组件的事件，在页码改变时触发，会传过来当前点击的页码值

    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
</style>
