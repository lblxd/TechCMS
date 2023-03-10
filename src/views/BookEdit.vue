<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "上架" }}商品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="model.author"></el-input>
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
          <el-form-item label="书籍评分">
            <el-rate
              style="margin-top: 0.6rem"
              :max="10"
              show-score
              v-model="model.scores"
            ></el-rate>
          </el-form-item>
          <el-form-item label="价格(人民币)">
            <el-input v-model="model.price"></el-input>
          </el-form-item>
          <el-form-item label="预览图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers = "getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.icon" :src="model.icon" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品详情" name="description">
          <vue-editor
            useCustomImageHandler
            @image-added="handleImageAdded"
            v-model="model.description"
          >
          </vue-editor>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
        icon: "",
        scores: 0,
      },
      category: [],
    };
  },
  methods: {
    afterUpload(res) {
      /* this.$set(this.model,'icon',res.url) */ /* 显式赋值 */
      this.model.icon = res.url;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/books/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/books", this.model);
      }
      this.$router.push("/books/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/books/${this.id}`);
      this.model = Object.assign(
        {},
        this.model,
        res.data
      ); /* 将model放入空对象，再将data放到空对象里，如果mdoel有scores，data没有那么就会合并而不是覆盖掉scores */
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.category = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData(); //这是vue自带的表单数据
      formData.append("file", file);

      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
};
</script>

<style>

</style>