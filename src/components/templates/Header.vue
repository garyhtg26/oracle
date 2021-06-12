<template>
  <div>
    <scroll-fixed-header :fixed.sync="fixed" :threshold="56">
      <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#" class="ml-3">
      <router-link to="/">
                <img
                  :src="require('@/assets/images/logo-yellow.png')"
                  alt="Oracle"
                  width="250px"
                  style="padding: 20px"
                />
              </router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="/" active class="mr-4">HOME</b-nav-item>
        <b-nav-item href="/premium" class="mr-4">PREMIUM</b-nav-item>
        <b-nav-item href="#" class="mr-4">DOWNLOAD</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      
        
        <b-navbar-nav  class="ml-auto" style="height:40px">
          
          <!-- <b-nav-form>
       <div class="input-group md-form form-sm form-2 pl-1" style="overflow: hidden;">
          <div class="el-select" style="border-color: white !important; border-radius: 20px; width: 100%; cursor: alias !important;">
          <div class="el-input el-input--suffix is-focus">
            <input type="text" autocomplete="" placeholder="Search" style="cursor:auto" class="el-input__inner">
            <span class="el-input__suffix">
              <span class="el-input__suffix-inner" >
                <i class="el-select__caret el-input__icon el-icon-"></i>
              </span>
            </span>
          </div>
          </div>
          <div class="input-group-append">
            <span data-v-4ece2516="" id="basic-text1" class="input-group-search" style="cursor: pointer">
              <i data-v-4ece2516="" aria-hidden="true" class="button fa fa-search" style="color: rgb(73, 80, 87);">
              </i>
            </span>
          </div>
        </div>
        </b-nav-form> -->
        <div class="search mr-4">
          <el-input placeholder="Search" v-model="search" icon="el-icon-search"></el-input>
        <i class="fa fa-search" style="color: #F9B410; padding:10px"></i>
        </div>
        
        <b-nav-item href="/premium" class="mr-4">PREMIUM</b-nav-item>
        <b-nav-item href="#" class="mr-4">DOWNLOAD</b-nav-item>
        <b-nav-item v-if="!$store.state.user.name" v-b-modal.modal-login class="mr-5">LOGIN</b-nav-item>
        
              <b-nav-item-dropdown 
              class="mr-5"
                right
                v-else>
          <!-- Using 'button-content' slot -->
                  <template #button-content>
                   <em>{{ $store.state.user.name }}</em>
                 </template>
                  <b-dropdown-item @click="logoutUser">Sign Out</b-dropdown-item>
               </b-nav-item-dropdown>
            
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
    </scroll-fixed-header>
    <!-- modal -->
<b-modal id="modal-login" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 style="color:#F9B410" >Login</h5>
      <p>Selamat datang kembali</p>
      <p style="font-size:12px; " class="mx-5">Masukkan nomor telepon Anda dan kami akan mengirimkan kode verifikasi Anda</p>
      <div class="md-form " style="border-bottom: 1px solid white; margin-left:120px; margin-right:120px">
         <i >+62  </i>
         <input 
            type="number"
            oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" 
            maxlength="12"
            placeholder="Nomor telepon" 
            style="outline: 0;border-width: 0px;color: white; background: #232323;"
            >
      </div>
      <b-button variant="light" @click="hideModal" v-b-modal.modal-verification  style="width:50%" class="mt-4 mb-2">Kirim</b-button>
   </div>
</b-modal>
<b-modal id="modal-verification" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 style="color:#F9B410">Verification</h5>
      <p>Selamat datang kembali</p>
      <p style="font-size:12px; " class="mx-5">Enter your verification code below that we send to you. we send to your SMS</p>
      <div>
        
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
        <input type="text" maxlength="1" class="verif mx-2" >
      </div>
      <b-button variant="light" style="width:50%" class="mt-4 mb-2">Login</b-button>
   </div>
</b-modal>
<b-modal id="modal-bank" title="BootstrapVue" hide-footer>
   <div class="child">
      <h5 style="color:#F9B410">Silahkan Pilih Bank</h5>

      <p style="font-size:12px; " class="mx-5">Kami akan memberi Anda instruksi tentang cara menyelesaikan transfer di ATM atau di aplikasi Mobile Banking</p>
      <div>
        <b-form-select style="width:30%" v-model="selected" :options="options"></b-form-select>
        <div class="mt-3" style="    text-align-last: left;
">
        <tr>
  <td>Kode pembayaran </td>
  <td> : {{selected}}</td>
</tr>
<tr>
  <td>Jumlah</td> 
  <td> : {{selected}}</td>
</tr>
<tr>
  <td>Kode Bank</td> 
  <td> : {{selected}}</td>
</tr>
        </div>
      </div>
      <b-button  variant="light" style="width:50%" class="child mt-4 mb-2">Lanjut</b-button>
      
   </div>
</b-modal>
<b-modal id="modal-detail" title="BootstrapVue" hide-footer>
   <div class="">
      <h5 style="color:#F9B410" class="child">Detail Pesanan</h5>

      <p style="font-size:12px; " class="child mx-5">Mohon konfirmasi pembayaran anda sudah benar.</p>
      <div>
  <table class="mt-4" border="0" >
<tr>
  <td>Nama </td>
  <td> :</td>
</tr>
<tr>
  <td>ID</td> 
  <td> :</td>
</tr>
<tr>
  <td>Harga</td> 
  <td> :</td>
</tr>
<tr>
  <td>Bayar dengan </td> 
  <td> :</td>
</tr>
<tr>
  <td>Order id </td> 
  <td> :</td>
</tr>
<tr>
  <td>Transaction id </td> 
  <td> :</td>
</tr>
<tr>
  <td>Status </td> 
  <td> :</td>
</tr>

</table>
      </div>
      <b-button variant="light" style="width:50%" class="mt-4 mb-2">Lanjut</b-button>
      
   </div>
</b-modal>
<!-- modal end -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Timer",
  data() {
    return {
      fixed: false,
      search:'',
      isNavOpen: false,
      modal: false,
      selected: null,
        options: [
          { value: null, text: 'Pilih Bank' },
          { value: '120', text: 'BCA' },
          { value: '120', text: 'Mandiri ' },
          { value: { C: '120' }, text: 'BRI' },
          { value: '120', text: 'BNI', disabled: true }
        ]
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn", "cartValue", "currentUser", "cartItemList"]),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
    
  },
};
</script>


<style scoped lang="scss">
td {
  padding-right:20px
}
.navbar {
  padding: 0rem 1rem  !important;
}
@media (max-width: 576px) {
    .input-group {
      height: 50px;
      width: 100%  !important;
    }
    .el-select{
      width: 100% !important;
    }
    .btn.login {
      margin: 20px;
    }
  }


::v-deep .navbar-dark .navbar-nav .nav-link {
    color: #F9B410 !important;
}
.btn-secondary {
  background-color: #4c4e50;
  border-color: #4c4e50;
}
.bg-dark {
    background-color: #1c1c1e  !important;
}

.login {
  text-transform: uppercase;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 500;
  padding: 10px;

  border-radius: 20px;
}


.navbar-light .navbar-nav .nav-link {
  color: #f8f9fa;
}
// .nav-link {
//   font-size: 13px !important;
//   text-transform: uppercase;
//   margin-left: 15px;
//   height: 65px;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
//     Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
// }
.nav-link:hover {
  color: white !important;
}
::v-deep .text-dark:hover {
  color: #2a7754 !important;
}
.navbar {
  box-shadow: none;

  /* the rest of your styling */
}
.btn {
  margin-right: 10px;
}
.navbar-2 a {
  color: white;
}

.li-pointer {
  cursor: pointer;
}
.navbar-main {
  background-color: #fff;
}

.search {
  -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    display: -webkit-box!important;
    display: -ms-flexbox!important;
    display: flex!important;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  border: 1px solid #F9B410 !important;
  border-radius: 10px !important;
}

::v-deep .el-input__inner {

    background-color: transparent !important;
    color: white  !important;

    border: none !important
}

// .border-bottom {
//     border-bottom: 1px solid #e5e7ea !important;
// }

.section-header {
  background-color: #232323;
}
.input-group-search{
    padding: 10px;
    position: absolute;
    margin-left: -40px;
    z-index: 3;
}
.li-pointer:hover {
  cursor: pointer;
}
.nohover:hover {
  background-color: transparent;
  cursor: default !important;
  /* or something like that */
}
.dropdown-toggle::after {
  display: none !important;
}

.dropdown {
  margin: auto;
}
.nav-link {
  color: #000;

}
.input-group {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    width: 50%;
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
.child {
  text-align: center;
  margin: 0px;
  justify-content: center;
}
</style>
