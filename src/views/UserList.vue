<template>
  <div class="about">
    <h1>用户列表</h1>
    <el-table
      :data="
        items.filter(
          (data) =>
            !search ||
            data.username.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="用户id" prop="_id"> </el-table-column>
      <el-table-column prop="isvip" label="会员状态">
        <template slot-scope="scope">
           <el-switch
          style="display: block;"
          v-model="scope.row.isvip"
          active-color="#13ce66"
          inactive-color="#ff4949"
          disabled
        >
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop="username"> </el-table-column>
      <el-table-column prop="avatar" label="用户头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      search: "",
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要注销用户名为"${row.username}"的用户吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
        this.fetch();
      });
    },
  },
  created() {
    this.fetch();
  },
};
</script>
