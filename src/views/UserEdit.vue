<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers = "getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
      <el-form-item label="会员状态">
        <el-switch
          style="display: block;margin-top:0.6rem"
          v-model="model.isvip"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="已开通"
          inactive-text="未开通"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url); /* vue显式赋值 */
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/users/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/users", this.model);
      }
      this.$router.push("/users/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/users/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

