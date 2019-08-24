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
            <el-select></el-select>
          </template>
        </el-form-item>
        <el-form-item>
          <template>
            <span>时间选择：</span>
            <el-date-picker
              v-model="value9"
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
              <img src="../../assets/img/404.png" alt />
            </div>
            <div class="info">
              <p>123456789</p>
              <span>状态</span>
              <p>2019年8月24日10:34:19</p>
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
        :page-size="10"
        :total="100"
        :current-page="1"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      radio: '1',
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
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
            background-color: red;
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
