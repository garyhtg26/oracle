<template>
  <div class="mb-3 item" :class="{ 'list-group-item': displayList }">
    <!-- <router-link :to="'/product/' + item.id">
  <div class="card">
    <div class="img-event intrinsic">
      <img :src="item.photos.length > 0 ? item.photos[0].photo : false" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3">
    </div>
  </div> 

   </router-link> -->

    <!-- dummy -->
    <router-link :to="'/product/' + item.name.replace(/\s/g, '+')">
      <div class="">
        <div class="img-event">
          <img :src="item.icon" class="grow thumbnail-image card-img-top" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["item", "displayList"],
  methods: {
    ...mapActions(["updateCart"]),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: 1,
        isAdd: true,
      };
      this.updateCart(order);
    },
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + "...";
      } else {
        return value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-text {
  font-size: 0.875rem;
}

.remain {
  color: #d17581;
}

.grow {
  transition: all 0.2s ease-in-out;
  border-radius: 20px;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;
  .thumbnail {
    display: inline-block;
    width: 100%;
  }
  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
    background-color: blueviolet;
    min-height: 200px;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
  }
}
</style>
