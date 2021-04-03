<template>
  <div class="slidecomp">
    <canvas-image :key="canvasKey" :is-empty="isEmpty" :image-id="id" />
    <br />
    <button type="button" class="canvass__btn" @click="previousImg">Previous</button>
    <button type="button" class="canvass__btn" @click="nextImg">Next</button>
    <br />
    <form class="slidecomp__form">
      <form-input-file @change="switchToFirstImage" />
      <label v-for="(text, ratio) in ratioTypes" :key="ratio" @change="changeRatio"
        >{{ text }}<input :id="ratio" :value="ratio" type="radio" name="ratio"
      /></label>
    </form>
    <button type="button" @click="slide">{{ buttonText }}</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import CanvasImage from '../components/CanvasImage.vue';
import FormInputFile from '../components/FormInputFile.vue';

export default {
  components: { CanvasImage, FormInputFile },
  data() {
    return {
      canvasKey: 'canvas1',
      slideStatus: false,
      interval: 0,
    };
  },
  computed: {
    ...mapState(['ratio', 'ratioTypes']),
    ...mapGetters(['numOfImages']),
    buttonText() {
      return this.slideStatus ? 'Stop slideshow' : 'Start slideshow';
    },
    id() {
      return +this.$route.params.id;
    },
    nextImageId() {
      return (this.id + 1) % this.numOfImages;
    },
    previousImageId() {
      return (this.id + this.numOfImages - 1) % this.numOfImages;
    },
    isEmpty() {
      return this.numOfImages === 0;
    },
    form() {
      return document.querySelector('.slidecomp__form');
    },
  },
  mounted() {
    if (sessionStorage.getItem('ratio') !== null) {
      const currentRatio = sessionStorage.getItem('ratio');
      this.setRatio(currentRatio);
    }
    document.querySelector(`input#${this.ratio}`).checked = true;
  },
  methods: {
    ...mapMutations(['setRatio']),
    previousImg() {
      if (!this.isEmpty && this.nextImageId !== this.id)
        this.$router.push({ name: 'Slide', params: { id: this.previousImageId } });
    },
    nextImg() {
      if (!this.isEmpty && this.nextImageId !== this.id)
        this.$router.push({ name: 'Slide', params: { id: this.nextImageId } });
    },
    switchToFirstImage() {
      clearInterval(this.interval);
      if (this.id !== 0) this.$router.push({ name: 'Slide', params: { id: 0 } });
      else this.updateKey();
    },
    changeRatio() {
      this.setRatio(this.form.ratio.value);
      this.updateKey();
    },
    // Обновляем ключ, чтобы обновился канвас
    updateKey() {
      this.canvasKey = this.canvasKey.replace(/(\d$)/, (match, number) => {
        return parseInt(number, 10) + 1;
      });
    },
    slide() {
      if (this.slideStatus) {
        clearInterval(this.interval);
        this.slideStatus = false;
      } else if (!this.isEmpty && this.nextImageId !== this.id) {
        this.interval = setInterval(this.nextImg, 1000);
        this.slideStatus = true;
      }
    },
  },
};
</script>

<style lang="scss">
.slidecomp {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  &__form {
    display: flex;
    flex-direction: column;
  }
}
</style>
