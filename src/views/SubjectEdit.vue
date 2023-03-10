<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}课程</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="类型">
            <el-select v-model="model.category">
              <el-option
                v-for="item of category"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              >
              </el-option>
            </el-select>
          </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="课程URL">
        <el-input v-model="model.url"></el-input>
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
      category:[],
    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.model, "icon", res.url); /* vue显式赋值 */
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/subjects/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/subjects", this.model);
      }
      this.$router.push("/subjects/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/subjects/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.category = res.data;
    },
  },
  created() {
    this.id && this.fetch();
    this.fetchCategories()
  },
};
</script>

<style></style>
