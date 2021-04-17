<template>
  <div id="app">
   <div class="detail">
       
     <router-view></router-view>
     <message-component></message-component>
   </div>
  </div>
</template>

<script>
import MessageComponent from './components/common/MessageComponent.vue';
import { mapActions } from 'vuex';
export default {
    components: {
      MessageComponent,
    },
    methods: {
      ...mapActions(['getShoppingCart', 'listenToProductList'])
    },
    created() {
      let uid = this.$store.getters.currentUser.uid;
      this.listenToProductList();
      this.getShoppingCart({uid, currentCart: this.$store.getters.cartItemList});
    }
    
  
}
</script>

<style>
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    background-color: #1C1C1E;
}
</style>