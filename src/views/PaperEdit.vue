<template>
  <div class="about">
    <h1>编辑文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="创建者" >
        <el-input v-model="model.createdavatar" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      category: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/papers/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/papers", this.model);
      }
      this.$router.push("/papers/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/papers/${this.id}`);
      this.model = res.data;
    },
  },
  created() {
    this.id && this.fetch();
  },
};
</script>
