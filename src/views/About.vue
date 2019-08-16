<template>
  <div>
    about
    <button @click="cancelGrouping">Cancel grouping</button>
    <input type="checkbox" v-model="checked" />
    <div id="container"></div>
  </div>
</template>

<script>
import Konva from "konva";

import {
  rectTableConstructor,
  circleTableConstructor
} from "@/utils/seatOrder";

export default {
  name: "about",
  data() {
    return {
      groupsList: [],
      shapesLayer: {},
      checked: false
    };
  },
  mounted() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var stage = new Konva.Stage({
      container: "container",
      width: width,
      height: height
    });

    var shapesLayer = new Konva.Layer();
    var groupsLayer = new Konva.Layer();
    var rectGroup = new Konva.Group({
      draggable: true,
      isGroup: false,
      name: "restGroup"
    });

    var circleGroup = new Konva.Group({
      draggable: true,
      isGroup: false,
      name: "circleGroup"
    });

    var mutualGroup = new Konva.Group({
      draggable: true,
      isGroup: false,
      name: "Konva group"
    });

    var configCircleTable = {
      x: 250,
      y: 250,
      radius: 30,
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      name: "table",
      id: 1
    };

    var configSeat = {
      x: 170,
      y: 170,
      radius: 10,
      fill: "grey",
      stroke: "black",
      strokeWidth: 1,
      name: "seat",
      id: 1
    };

    var configRectTable = {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
      name: "table",
      id: 2
    };

    let configs = rectTableConstructor(2, {
      tableX: configRectTable.x,
      tableY: configRectTable.y,
      width: configRectTable.width,
      height: configRectTable.height
    });

    let circleConfigs = circleTableConstructor(2, {
      tableX: configCircleTable.x,
      tableY: configCircleTable.y,
      radius: configCircleTable.radius
    });

    circleConfigs.forEach(config => {
      let seat = new Konva.Circle(config);
      circleGroup.add(seat);
    });

    configs.forEach(config => {
      let seat = new Konva.Circle(config);
      rectGroup.add(seat);
    });

    var rectTable = new Konva.Rect(configRectTable);
    var circleTable = new Konva.Circle(configCircleTable);
    var seat = new Konva.Circle(configSeat);

    rectGroup.on("click", event => {
      if (!this.checked) return;
      let group = event.target.parent;
      group.draggable(false);
      console.log(group, "rect");
      group.remove();
      mutualGroup.add(group);
      this.groupsList.push(group);
    });

    // rectGroup.on('xChange', (event) => {
    //   console.log(event, 'event')
    // });

    circleGroup.on("click", event => {
      if (!this.checked) return;
      let group = event.target.parent;
      console.log(group, "circ");
      group.draggable(false);
      group.remove();
      mutualGroup.add(group);
      this.groupsList.push(group);
    });

    mutualGroup.on('dragend', e => {
      console.log(e)
    })

    rectGroup.add(rectTable);
    circleGroup.add(circleTable);

    // mutualGroup.add(circleGroup, rectGroup)
    shapesLayer.add(rectGroup, circleGroup, mutualGroup);
    this.shapesLayer = shapesLayer;
    stage.add(shapesLayer, groupsLayer);
  },
  methods: {
    cancelGrouping() {
      if (this.groupsList.length == 0) {
        return;
      }
      this.groupsList.forEach(group => {
        group.remove();
        this.shapesLayer.add(group);
        group.draggable(true);
        this.checked = false;
      });
      this.groupsList = [];
    }
  }
};
</script>
