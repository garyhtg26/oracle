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

      <b-row v-if="!isProductLoading">
        <b-col v-for="prod in lists" :key="prod.id" cols="6" sm="3" md="2">
          <app-product-item
            :item="prod"
            :length="products.length"
            :displayList="displayList"
          ></app-product-item>
        </b-col>
      </b-row>
      <div style="margin-bottom: 25px"></div>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import ProductItem from "./product/ProductItem.vue";
import GridLoader from "vue-spinner/src/GridLoader.vue";
// import voucher from "@/controller/voucher.js";
// import base from "@/router/link.js";
// import axios from "axios";
export default {
  props: {
    category: Array,
    reverse: Boolean,
    products: Array,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      displayList: false,
      isProductLoading: false,
    };
  },
  // computed: {
  //   ...mapGetters([/* 'products' , */ "isProductLoading"]),
  // },
  computed: {
    lists() {
      return this.reverse
        ? this.products.filter((x) => this.category.indexOf(x.name) == -1)
        : this.products.filter((x) => this.category.indexOf(x.name) > -1);
    },
  },
  components: {
    appProductItem: ProductItem,
    GridLoader,
  },

  methods: {
    changeDisplay(isList) {
      this.displayList = isList;
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
