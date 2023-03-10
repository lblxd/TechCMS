<template>
  <div class="about">
    <h1>问题详情</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="问题">
        <el-input v-model="model.question"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-input type="textarea" v-model="model.answer"></el-input>
      </el-form-item>
      <el-form-item label="问题状态">
        <el-switch
          style="display: block;margin-top:0.6rem"
          v-model="model.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="已解决"
          inactive-text="未解决"
        >
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交答案</el-button>
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
      this.$set(this.model, "icon", res.url); /* vue显式赋值 */
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/matters/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/matters", this.model);
      }
      this.$router.push("/matters/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/matters/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>

<style>
</style>
