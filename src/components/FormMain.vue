<template>
  <div class="main-form__wrapper">
    <form class="main-form" @submit.prevent="submitForm">
      <form-input-file />
      <label v-for="(text, ratio) in ratioTypes" :key="ratio"
        >{{ text }}<input :id="ratio" :value="ratio" type="radio" name="ratio"
      /></label>
      <input type="submit" value="Start" />
    </form>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import FormInputFile from './FormInputFile.vue';

export default {
  name: 'MainForm',
  components: { FormInputFile },
  computed: {
    ...mapState(['ratioTypes']),
    form() {
      return document.querySelector('.main-form');
    },
  },
  mounted() {
    if (sessionStorage.getItem('ratio') !== null) {
      const currentRatio = sessionStorage.getItem('ratio');
      this.setRatio(currentRatio);
      document.querySelector(`input#${currentRatio}`).checked = true;
    }
  },
  methods: {
    ...mapMutations(['setRatio']),
    submitForm() {
      this.setRatio(this.form.ratio.value);
      this.$router.push({ name: 'Slide', params: { id: 0 } });
    },
  },
};
</script>

<style lang="scss">
.main-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #000;
  margin: 0 auto;
  max-width: 30rem;
  &__wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }
  & label {
  }
}
</style>
