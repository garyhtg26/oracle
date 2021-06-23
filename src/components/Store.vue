<template>
  <div>
    <h2 style="text-align: center; margin-top: 20px; margin-bottom: 20px"></h2>
    <div class="container" :class="{ loadingItem: isProductLoading }">
      <div class="row text-center" v-if="isProductLoading">
        <grid-loader
          :loading="isProductLoading"
          :color="loaderColor"
          :size="loaderSize"
        ></grid-loader>
      </div>
      <!-- <pre>

      {{ products.map((x) => x.name) }}
      </pre> -->
      <div class="row" v-if="!isProductLoading">
        <app-product-item
          v-for="prod in products"
          :item="prod"
          :key="prod.id"
          :length="products.length"
          :displayList="displayList"
        ></app-product-item>
      </div>
      <div style="margin-bottom: 25px"></div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import voucher from "@/controller/voucher.js";
// import base from "@/router/link.js";
// import axios from "axios";
export default {
  props: {
    category: Array,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false,
      products: [],
      isProductLoading: false,
    };
  },
  // computed: {
  //   ...mapGetters([/* 'products' , */ "isProductLoading"]),
  // },
  components: {
    appProductItem: ProductItem,
    GridLoader,
  },
  mounted() {
    this.getItem();
  },
  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
    },
    getItem() {
      this.isProductLoading = true;
      voucher.list(this.$store).then((res) => {
        this.products = res;
        this.$store.commit("products", res);
        this.isProductLoading = false;
      });
      // axios
      //   .get(base.url + "products")
      //   .then((response) => (this.products = response.data));
    },
  },
};
</script>

<style >
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>
