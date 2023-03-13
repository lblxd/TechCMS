<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-active="$route.path">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理</template
          >
          <el-menu-item-group>
            <template slot="title">文章管理</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/data">数据展示</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">商品管理</template>
            <el-menu-item index="/books/create">商品上架</el-menu-item>
            <el-menu-item index="/books/list">商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"
            ><i class="el-icon-message"></i>运营管理</template
          >
          <el-menu-item-group>
            <template slot="title">vip课程</template>
            <el-menu-item index="/subjects/create">新建课程</el-menu-item>
            <el-menu-item index="/subjects/list">课程列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">会员问答管理</template>
            <el-menu-item index="/matters/list">问题列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">论坛管理</template>
            <el-menu-item index="/papers/list">论坛文章列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">广告管理</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-message"></i>系统设置</template
          >
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/users/create">新建用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>退出账号</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
</script>
