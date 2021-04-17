<template>
<scroll-fixed-header :fixed.sync="fixed" :threshold="56">
<header class="section-header ">
<section class="header-main border-bottom mx-4" style="height: 80px;">
<nav class="navbar navbar-expand-md navbar-light ">
    <div class="d-flex flex-grow-1">
        <a href="/">
         <img
              :src="require('@/assets/images/logo.png')"
              alt="Oracle"
              width="150px"
              style="padding:20px"
            />
        </a>
        <div style="margin-top:8px">
          <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        
        <a class="nav-link" href="/premium">Premium</a>
      </li>
      
    </ul>
        </div>
     
    </div>
  
    <div class=" flex-shrink-1 flex-grow-0 order-last" id="navbarTop" :class="{show: isNavOpen}">
     <b-button v-b-modal.modal-1 class="login">
       <div style="padding:3px;line-height: 17px; margin-left:6px; margin-right:6px;">
          login<span class="fa fa-chevron-right ml-2" ></span>
       </div>     
       </b-button>
       <b-modal id="modal-1" title="BootstrapVue">
    <p class="my-4">Hello from modal!</p>
  </b-modal>
    </div>
    <div>
    </div>
</nav>
</section>

</header>
</scroll-fixed-header>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
export default {
  name: 'Timer',
  data() {
    return {
      fixed: false,
      isNavOpen: false
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'cartValue', 'currentUser', 'cartItemList']),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : ''
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen
    }
  }
}
</script>


<style scoped lang="scss">
.btn-secondary {
    background-color: #4c4e50;
    border-color: #4c4e50;
}
.login {
  text-transform: uppercase;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 500;
  padding: 10px;
  
  border-radius: 20px;


  
}
a {
    color: #000; /* for browsers that don't support 'inherit' as a color value */
    color: inherit;
}
.navbar-light .navbar-nav .show > .nav-link, .navbar-light .navbar-nav .active > .nav-link, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .nav-link.active {
    color: #f8f9fa;
    border-bottom: 1px solid #096866;
}
.navbar-light .navbar-nav .nav-link {
    color: #f8f9fa;
}
.nav-link {

    font-size: 13px !important;
    text-transform: uppercase;
    margin-left: 15px;
    height: 65px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.nav-link:hover {
      color: white  !important;
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
  color: white ;
}
.hitam {
  color: #000;
}
.ijo {
  color: #28a745 !important;
}
.putih {
  color: white !important;
}
.li-pointer {
  cursor: pointer;
}
.navbar-main {
    background-color: #fff;
}

// .border-bottom {
//     border-bottom: 1px solid #e5e7ea !important;
// }

.section-header {
    background-color: #232323;
    
}

.li-pointer:hover {
  cursor: pointer;
}
.nohover:hover {
    background-color: transparent;
    cursor:default !important;
    /* or something like that */
}
.dropdown-toggle::after {
    display: none !important;
}

.dropdown {
  margin: auto;
}
.nav-link{
  color: #000 ;
  font-size: 1.1em;
}
.notify {
    position: relative;
    top: -9px;
    display: inline-block;
    padding: .25em .6em;
    font-size: 12px;
    line-height: 1;
    text-align: center;
    border-radius: 3rem;
    color: #fff;
    background-color: #fa3434;
}
</style>
