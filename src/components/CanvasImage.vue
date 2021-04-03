<template>
  <div class="canvas__wrapper">
    <canvas class="canvas"> </canvas>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'CanvasImage',
  props: {
    imageId: {
      type: Number,
      reuqired: true,
      default: 0,
    },
    isEmpty: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  computed: {
    ...mapState(['images', 'ratio']),
    canvas() {
      return document.querySelector('canvas');
    },
    ctx() {
      return this.canvas.getContext('2d');
    },
  },
  watch: {
    $route(to) {
      const newImageId = to.params.id;
      this.drawImage(newImageId);
    },
  },
  mounted() {
    this.canvas.height = this.canvas.clientHeight;
    this.canvas.width = this.canvas.clientWidth;
    if (this.isEmpty) {
      this.drawText();
    } else {
      this.drawImage(this.imageId);
    }
    window.onresize = this.resize;
  },
  methods: {
    drawImage(imageId) {
      const img = new Image();
      const src = this.images[imageId];
      img.src = src;
      const canvasHeight = this.canvas.height;
      const canvasWidth = this.canvas.width;
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
      this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      img.addEventListener('load', () => {
        const { imgHeight, imgWidth } = this.getSize(img, canvasHeight, canvasWidth);
        const { x, y } = this.getPosition(imgHeight, imgWidth, canvasHeight, canvasWidth);
        this.ctx.drawImage(img, x, y, imgWidth, imgHeight);
      });
    },
    drawText() {
      this.ctx.font = '30px Arial';
      this.ctx.fillText('No images', this.canvas.width / 2 - 50, this.canvas.height / 2);
    },
    resize() {
      this.canvas.height = this.canvas.clientHeight;
      this.canvas.width = this.canvas.clientWidth;
      if (this.isEmpty) {
        this.drawText();
      } else {
        this.drawImage(this.imageId);
      }
    },
    getPosition(imgHeight, imgWidth, canvasHeight, canvasWidth) {
      const x = canvasWidth / 2 - imgWidth / 2;
      const y = canvasHeight / 2 - imgHeight / 2;
      return { x, y };
    },
    getSize(img, canvasHeight, canvasWidth) {
      const { height: imgHeight, width: imgWidth } = img;
      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;
      switch (this.ratio) {
        case 'stretch':
          return {
            imgHeight: canvasHeight,
            imgWidth: canvasWidth,
          };
        case 'keepSize':
          return {
            imgHeight,
            imgWidth,
          };
        case 'fit':
          if (imgRatio < canvasRatio) return this.fitH(imgRatio, canvasHeight);
          return this.fitW(imgRatio, canvasWidth);
        case 'fitH':
          return this.fitH(imgRatio, canvasHeight);
        case 'fitW':
          return this.fitW(imgRatio, canvasWidth);
        case 'square':
          if (canvasRatio >= 1) return { imgHeight: canvasHeight, imgWidth: canvasHeight };
          return { imgHeight: canvasWidth, imgWidth: canvasWidth };
        default:
          return {
            height: this.canvasHeight,
            width: this.canvasWidth,
          };
      }
    },
    fitW(imgRatio, canvasWidth) {
      return { imgHeight: canvasWidth / imgRatio, imgWidth: canvasWidth };
    },
    fitH(imgRatio, canvasHeight) {
      return { imgHeight: canvasHeight, imgWidth: imgRatio * canvasHeight };
    },
  },
};
</script>
<style lang="scss">
.canvas {
  border: 1px solid #000;
  &__wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
