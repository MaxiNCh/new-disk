<template>
  <label class="main-form__file" for="file">
    <input
      id="file-input"
      name="file"
      type="file"
      accept=".svg,.png,.jpg"
      multiple
      webkitdirectory
      required
      @change="change"
    />
  </label>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'DropFile',
  data() {
    return {
      re: /^.+\.(?:img|jpg|svg|png|jpeg|bmp)$/,
    };
  },
  computed: {
    ...mapState(['images']),
  },
  methods: {
    ...mapMutations(['addImage', 'removeImages']),
    change(e) {
      this.removeImages();
      e.target.files.forEach((file) => {
        if (this.re.test(file.name)) {
          this.addImage(URL.createObjectURL(file));
        }
      });
      this.$emit('change');
    },
  },
};
</script>

<style lang="scss"></style>
