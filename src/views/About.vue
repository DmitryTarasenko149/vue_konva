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
      checked: false,
      mutualGroupX: 0,
      mutualGroupY: 0
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

    stage.on('click', e => {
      console.log(e.target, 'value')
    })

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
      name: "circleGroup",
      dragBoundFunc: (pos) => {
        return pos;
      }
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
      console.log(group.attrs, "rect");
      group.remove();
      mutualGroup.add(group);
      this.groupsList.push(group);
    });

    circleGroup.on("click", event => {
      if (!this.checked) return;
      let group = event.target.parent;
      console.log(group.attrs, "circ");
      group.draggable(false);
      group.remove();
      mutualGroup.add(group);
      this.groupsList.push(group);
    });

    mutualGroup.on('dragend', e => {
      this.mutualGroupX = e.target.x();
      this.mutualGroupY = e.target.y();
    })

    rectGroup.add(rectTable);
    circleGroup.add(circleTable);

    var newCircleGroup = circleGroup.clone({
      name: 'circle group new',
      id: 'ct 2',
      x: 250,
      y: 250
    })

    console.log(circleGroup, 'circle');
    console.log(newCircleGroup, 'new circle');

    shapesLayer.add(rectGroup, circleGroup, mutualGroup, newCircleGroup);
    this.shapesLayer = shapesLayer;
    stage.add(shapesLayer, groupsLayer);

    var scaleBy = 1.01;
      stage.on('wheel', e => {
        e.evt.preventDefault();
        var oldScale = stage.scaleX();
        console.log('scale', stage.scaleX())

        var mousePointTo = {
          x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
          y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        var newScale =
          e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
        stage.scale({ x: newScale, y: newScale });

        var newPos = {
          x:
            -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
            newScale,
          y:
            -(mousePointTo.y - stage.getPointerPosition().y / newScale) *
            newScale
        };
        stage.position(newPos);
        stage.batchDraw();
      });

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
        group.x(group.x() + this.mutualGroupX);
        group.y(group.y() + this.mutualGroupY);
      });
      this.groupsList = [];
    }
  }
};
</script>
