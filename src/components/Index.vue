<template>
  <div class="d-flex flex-column sticky-footer-wrapper">
    <main class="flex-fill">
      <app-header></app-header>
      <div class="container mt-3">
        <div class="row">
          <div class="col-md-6 col-sm-12">
               <app-slider></app-slider>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="row mt-5">
               <div class="col-6 berita">
                <img class="berita-img" :src="berita">
                <div class="berita-title my-2">Ganjar Launching Aplikasi Karya Anak Jawa Tengah</div>
                <div class="link-berita">www.mediaindonesia.com</div>
              </div>
              <div class="col-6 berita">
                <img class="berita-img" :src="berita">
                <div class="berita-title my-2">Ganjar Launching Aplikasi Karya Anak Jawa Tengah</div>
                <div class="link-berita">www.mediaindonesia.com</div>
              </div>      
            </div>
          </div>
        </div>
      </div>
     
      <message-component></message-component>
      <div class="container product" style="background-color: #232323"></div>
      <div class="container " style="background-color: #232323">
        <div class="row">
          <div class="col-md-12">
            <h6 class="mx-4 mt-4" style="color:white">Mobile</h6>
            <app-store></app-store>
             <div style="margin-top: -2px; width: 100%">
                <el-image class="banner-top" :src="banner"></el-image>
            </div>
            <h6 class="mx-4 mt-4" style="color:white">PC Games</h6>
            <h6 class="mx-4 mt-4" style="color:white">Others</h6>
            <div
              class="card panel-warning d-none d-sm-flex"
              id="reset-store-panel"
            ></div>
          </div>
        </div>
      </div>
    </main>

    <app-footer></app-footer>

  </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./templates/Header.vue";
import Slider from "./Slider.vue";
import Store from "./Store.vue";
import Footer from "./templates/Footer.vue";
import MessageComponent from "./common/MessageComponent.vue";

export default {
  components: {
    appHeader: Header,
    appSlider: Slider,
    appStore: Store,
    appFooter: Footer,
    MessageComponent,
  },
  data() {
    return {
      src: require("@/assets/images/4.png"),
      berita: require("@/assets/images/berita1.jpeg"),
      banner: require("@/assets/images/banner.png"),
    };
  },
  methods: {
    ...mapActions(["getShoppingCart", "listenToProductList"]),
  },
  created() {
    let uid = this.$store.getters.currentUser.uid;
    this.listenToProductList();
    this.getShoppingCart({
      uid,
      currentCart: this.$store.getters.cartItemList,
    });
  },
};
</script>

<style >
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
a {
  color: #212529;
  text-decoration: none;
  background-color: transparent;
}

#reset-store-panel {
  position: fixed;
  bottom: 0px;
  right: 0px;
}

body,
.sticky-footer-wrapper {
  min-height: 100vh;
}
.berita {
  cursor: pointer;
}
.berita-img{
  height: 175px;
  border-radius: 20px;
}
.berita-title{
  color: #F9B410;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
}
.link-berita{
  font-weight: normal;
font-size: 12px;
line-height: 14px;
color: white;
}
.child {
  text-align: center;
  margin: 0px;
  justify-content: center;
}
.flex-fill {
  flex: 1 1 auto;
}
.modal-header .close {

    color: white;
}
.modal-header {

    padding: 0px !important;
    border-bottom: 1px solid #232323  !important;

}
.modal-body {
    padding: 0px !important;
    color: white !important;

}
.modal-content {
    padding: 20px;
    background-color: #232323 !important;
   
}
.verif {
  border-bottom: 1px solid #fff;
  outline: 0;
  border-width: 0 0 2px; 
  background: #232323; 
  color:white;
  width: 13px;
}
/* footer {
    height: 40px;
    color: #666;
    padding: 10px 0 10px 0;
    font-size: 85%;
  }
  footer a {
    color: #999;
  }
  footer a:hover {
    color: #efefef;
  }
  @media (max-width: 576px) {
    footer {
      height: 50px;
    }
  } */
</style>
