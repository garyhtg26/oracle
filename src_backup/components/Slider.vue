<template>
  <div style="padding: 5px; margin-left: 5px; margin-right: 5px">
    <vueper-slides
      class="no-shadow"
      arrows-outside
      bullets-outside
      transition-speed="250"
      autoplay
      fixed-height="250px"
      :arrows="false"
      :pause-on-hover="pauseOnHover"
      @autoplay-pause="internalAutoPlaying = false"
      @autoplay-resume="internalAutoPlaying = true"
    >
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="slide.id"
        :content="slide.content"
        :image="slide.photo"
        :style="'background-color: ' + ['#42b983', '#ff5252'][i % 2]"
      />
    </vueper-slides>
    <!-- <vueper-slides
      arrows-outside
      bullets-outside
      transition-speed="1050"
      :slide-ratio="1 / 4"
      fixed-height="300px"
      ref="myVueperSlides"
      autoplay
      :arrows="false"
      :pause-on-hover="pauseOnHover"
      @autoplay-pause="internalAutoPlaying = false"
      @autoplay-resume="internalAutoPlaying = true"
    >
      <vueper-slide
        v-for="(slide, i) in slides"
        :key="slide.id"

        :content="slide.content"
        :image="slide.photo"
        :style="'background-color: ' + ['#42b983', '#ff5252'][i % 2]"
      />
      <template v-slot:pause>
        <i class="icon pause_circle_outline"></i>
      </template>
    </vueper-slides> -->
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import pages from "@/controller/pages.js";

export default {
  components: {
    VueperSlides,
    VueperSlide,
  },
  data: () => ({
    pauseOnHover: true,
    autoPlaying: true,
    internalAutoPlaying: true,
    slides: [
      {
        image: require("@/assets/images/banners/1.png"),
      },
      {
        image: require("@/assets/images/banners/1.png"),
      },
      {
        image: require("@/assets/images/banners/1.png"),
      },
    ],
  }),
  mounted() {
    pages.index(1).then((e) => (this.slides = e));
  },
};
</script>


<style scoped >
.ex--center-mode {
  width: 600px;
  max-width: 100%;
  margin: auto;
}
span {
  margin-right: 20px;
  color: white;
}
a:hover {
  color: white;
}
::v-deep .vueperslides__bullet .default {
  background-color: #096866 !important;
}

a {
  text-decoration: none !important;
  color: white !important;
}
::v-deep .vueperslides__bullet--active .default {
  border-width: 6px;
  border-color: white;
}
</style>
