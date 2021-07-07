<template>
  <div id="app">
    <div class="detail">
      <!-- <v-expand-transition> -->
      <router-view></router-view>
      <!-- </v-expand-transition> -->
      <message-component></message-component>
    </div>
  </div>
</template>

<script>
import MessageComponent from './components/common/MessageComponent.vue'
import { mapActions } from 'vuex'
import transaction from './controller/transactions'
import axios from 'axios'
// import auth from './controller/auth.js'
export default {
  components: {
    MessageComponent,
  },
  methods: {
    ...mapActions(['getShoppingCart', 'listenToProductList']),
    async prepare() {
      const payments = await transaction.payments()
      // const available = await Axios.get("/payments-available");
      // if (available.data.availableAll) {
      this.$store.commit('payments', payments.data)
      // } else {
      //   this.$store.commit(
      //     "payments",
      //     payments.data.filter(
      //       (x) => available.data.enabled.indexOf(x.channel_code) > -1
      //     )
      //   );
      // }
    },
  },
  mounted() {
    // let uid = this.$store.getters.currentUser.uid;
    // this.listenToProductList();
    // this.getShoppingCart({
    //   uid,
    //   currentCart: this.$store.getters.cartItemList,
    // });
    if (this.$store.state.authentication) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.$store.state.authentication
      // auth.prepare(this.$store, true)
    }
    this.prepare()
  },
  beforeEnter(to, from, next) {
    if (this.$store.state.authentication) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.$store.state.authentication
    }
    next();
  },
}
</script>

<style>
body {
  max-width: 100% !important;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #1c1c1e;
}
</style>
