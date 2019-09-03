<template>
  <div>
    <v-stage
      :config="stage"
    >
      <v-layer>
        <template v-if="seats && seats.length > 0">
          <v-seat v-for="seat in seats"
            :key="seat.id"
            :seat="seat"
          >
          </v-seat>
        </template>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import Konva from 'konva';
import VSeat from '@/components/VSeat.vue';

export default {
  name: 'home',
  components: {
    'v-seat': VSeat,
  },
  computed: {
    stage() {
      return this.$store.state.stage;
    },
    seats() {
      return this.$store.state.seats;
    },
  },
};
</script>
