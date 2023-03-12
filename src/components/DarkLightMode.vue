<template>
  <div class="themeMode">
    <q-toggle
      v-model="darkMode"
      checked-icon="nights_stay"
      color="primary"
      keep-color
      unchecked-icon="light_mode"
      @click="$emit('getTheme', darkMode)"
    />
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useQuasar } from "quasar";
export default defineComponent({
  setup() {
    const darkMode = ref(false);
    const $q = useQuasar();

    watch(darkMode, (darkMode) => {
      $q.dark.set(darkMode);

    });

    return {
      darkMode,
    };
  },
});
</script>

