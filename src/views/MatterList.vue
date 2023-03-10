<template>
  <div class="about">
    <h1>问题列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="author.username" label="提问用户">
      </el-table-column>
      <el-table-column prop="question" label="问题">
      </el-table-column>

      <el-table-column prop="state" label="状态">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/matters/edit/${scope.row._id}`)"
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
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/matters");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定要删除分类"${row.question}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`rest/matters/${row._id}`);
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
