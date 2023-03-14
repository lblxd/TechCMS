<template>
  <div class="container">
    <div class="lfchart">
      <div class="card">
        <p>
          用户总数：<span>{{ this.user.length }}</span> 人
        </p>
        <p>
          开通会员人数：<span>{{ this.compUser()[1].value }}</span> 人
        </p>
        <p>
          网站现共发布了：<span>{{ this.articles.length }}</span> 篇文章
        </p>
        <p>
          网站现共发布了：<span>{{ this.subjects.length }}</span> 门课程
        </p>
        <p>
          各类书籍总和：<span>{{ this.books.length }}</span> 本
        </p>
      </div>
      <div id="shopChart"></div>
    </div>
    <div class="chartCup">
      <div id="bookChart" class="lchart"></div>
      <div id="userChart" class="lchart"></div>
    </div>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  name: "",
  data() {
    return {
      charts1: "",
      charts2: "",
      charts3: "",
      books: [],
      shop: [],
      user: [],
      articles: [],
      subjects: [],
    };
  },
  methods: {
    //重新分配book数据
    compBook() {
      let arr = this.books;
      let list = [
        "63885358ca6799baab93a4d0",
        "6388535fca6799baab93a4d9",
        "6388538fca6799baab93a4e2",
        "6388539cca6799baab93a4eb",
      ];
      let newArr = [];
      list.forEach((item) => {
        let listArr = arr.filter(function comp(res) {
          return res.category == item;
        });
        if (item == "63885358ca6799baab93a4d0") {
          newArr.push({ name: "英语", value: listArr.length });
        } else if (item == "6388535fca6799baab93a4d9") {
          newArr.push({ name: "数学", value: listArr.length });
        } else if (item == "6388538fca6799baab93a4e2") {
          newArr.push({ name: "政治", value: listArr.length });
        } else {
          newArr.push({ name: "专业课", value: listArr.length });
        }
      });
      return newArr;
    },
    //重新分配销售数据
    compShop() {
      let list = this.shop;
      let xArr = [];
      let dataArr = [];
      list.forEach((item) => {
        xArr.push(item.createdAt);
        dataArr.push(item.total);
      });
      let data = [];
      data.push(xArr, dataArr);
      return data;
    },
    //重新分配用户数据
    compUser() {
      let list = this.user;
      let newArr = [];
      let vipArr = list.filter((res) => {
        return res.isvip == true;
      });
      let norArr = list.filter((res) => {
        return res.isvip != true;
      });
      newArr.push(
        { value: norArr.length, name: "普通用户" },
        { value: vipArr.length, name: "vip用户" }
      );
      return newArr;
    },
    //书籍分类
    drawBook() {
      //处理后端books数据
      //初始化并直接挂载到charts上
      this.charts1 = this.$echarts.init(document.getElementById("bookChart"));
      this.charts1.clear();
      const newArr = this.compBook();
      this.charts1.setOption(
        {
          //图表标题
          title: {
            text: "书品分类",
            left: "center",
            top: 10,
            textStyle: {
              color: "#011627",
            },
          },
          tooltip: {
            trigger: "item",
            //拼接显示
            formatter: (params) => {
              return `${params.name}:${params.value}本`;
            },
          },
          visualMap: {
            show: false,
            min: 1,
            max: 100,
            inRange: {
              colorLightness: [0, 5],
            },
          },
          series: [
            {
              name: "详细",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
              data: newArr.sort(function (a, b) {
                return a.value - b.value;
              }),
              roseType: "radius",
              label: {
                color: "rgb(1, 14, 26)",
              },
              labelLine: {
                lineStyle: {
                  color: "rgb(1, 14, 26)",
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
            },
          ],
        },
        true
      );
    },
    //销售额展示
    drawShop() {
      this.charts2 = this.$echarts.init(document.getElementById("shopChart"));
      this.charts2.clear();
      let data = this.compShop();
      data[0] = data[0].map((i) => i.substring(0, i.length - 14));
      this.charts2.setOption(
        {
          title: {
            text: "销售统计",
            left: "center",
            top: 20,
            textStyle: {
              color: "#011627",
            },
          },
          tooltip: {
            trigger: "item",
            //拼接显示
            formatter: (params) => {
              return `总计${params.value}元`;
              console.log(params);
            },
          },
          xAxis: {
            type: "category",
            data: data[0].map((i) => i.slice(5)),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: data[1],
              type: "line",
              smooth: true,
            },
          ],
        },
        true
      );
    },
    drawUser() {
      this.charts3 = this.$echarts.init(document.getElementById("userChart"));
      this.charts3.clear();
      let newArr = this.compUser();
      this.charts3.setOption(
        {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "用户身份",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: newArr,
            },
          ],
        },
        true
      );
    },
    //Api
    async fetch() {
      const res = await this.$http.get("rest/books");
      this.books = res.data;
      this.drawBook();
    },
    async fetchShop() {
      const res = await this.$http.get("userbooks");
      this.shop = res.data;
      this.drawShop();
    },
    async fetchUser() {
      const res = await this.$http.get("rest/users");
      this.user = res.data;
      this.drawUser();
    },
    async fetchArticle() {
      const res = await this.$http.get("rest/articles");
      this.articles = res.data;
    },
    async fetchSubject() {
      const res = await this.$http.get("rest/subjects");
      this.subjects = res.data;
    },
  },
  created() {
    this.fetch();
    this.fetchShop();
    this.fetchUser();
    this.fetchArticle();
    this.fetchSubject();
  },
};
</script>

<style>
.container {
  margin-top: 50px;
  display: flex;
  width: 100%;
}
.chartCup {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.lchart {
  width: 500px;
  height: 300px;
}
.lfchart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#shopChart {
  width: 1000px;
  height: 400px;
  margin-top: 50px;
}
.card {
  width: 800px;
  height: 300px;
  background: #07182e;
  position: relative;
  display: flex;
  flex-direction: column;
  place-content: center;
  place-items: center;
  overflow: hidden;
  border-radius: 20px;
}

.card p span {
  z-index: 1;
  color: white;
  font-size: 2rem;
}
.card p {
  margin: 0;
  z-index: 1;
  color: rgb(0, 183, 255);
  font-weight: bold;
  font-size: 17px;
}

.card::before {
  content: "";
  position: absolute;
  width: 800px;
  background-image: linear-gradient(
    180deg,
    rgb(0, 183, 255),
    rgb(255, 48, 255)
  );
  height: 150%;
  animation: rotBGimg 3s linear infinite;
  transition: all 0.6s linear;
}

@keyframes rotBGimg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.card::after {
  content: "";
  position: absolute;
  background: #07182e;
  inset: 5px;
  border-radius: 15px;
}
</style>
