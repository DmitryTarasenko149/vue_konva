<template>
  <v-circle
    :config="seatConfig"
    @dragend="dragEnd($event)"
  >
  </v-circle>
</template>

<script>
export default {
  name: 'v-seat',
  props: {
    seat: {
      type: Object,
    },
    viewOptions: {
      type: Object,
    },
  },
  computed: {
    seatConfig() {
      return this.seat.viewOptions
        ? { ...this.seat, ...this.seat.viewOptions }
        : { ...this.seat, ...this.viewOptions };
    },
  },
  methods: {
    dragEnd(event) {
      const { id, x, y } = event.target.attrs;
      this.$store.dispatch('updateSeatCoordinates', { id, x, y });
    },
  },
};
</script>
