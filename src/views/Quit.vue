<template>
  <div class="login-container">
    <el-form @submit.native.prevent="quit">
      <el-form-item>
        <el-button type="primary" native-type="submit">退出登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async quit() {
      this.$confirm(`是否确定要退出系统`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        localStorage.clear();
        this.$router.push("/login");
        this.$message({
          type: "success",
          message: "退出成功，请重新登录",
        });
      });
    },
  },
};
</script>

<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>
