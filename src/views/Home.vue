<template>
  <div id="home-container">

  </div>
</template>

<script>
import Konva from 'konva';

export default {
  name: "home",
  mounted() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: "home-container",
      width: width,
      height: height
    });
    var shapesLayer = new Konva.Layer();
    var blockGroup = new Konva.Group();

    shapesLayer.add(blockGroup);
    stage.add(shapesLayer);
  }
};
</script>
