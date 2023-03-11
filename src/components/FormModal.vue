<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Fixed size" color="primary" @click="fixed = true" />
    <q-dialog v-model="fixed" >
        <q-card style="width: 900px; max-width: 80vw; height: 60vh;">
            
            <q-form @submit="onSubmit" color="primary" @reset="onReset" class="q-gutter-md"  >
              <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
              />
      
              <q-input
                filled
                type="number"
                v-model="age"
                label="Your age *"
                lazy-rules
                :rules="[
                  (val) => (val !== null && val !== '') || 'Please type your age',
                  (val) => (val > 0 && val < 100) || 'Please type a real age',
                ]"
              />
      
              <q-toggle v-model="accept" label="I accept the license and terms" />
      
              <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
              </div>
            </q-form>
        </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const age = ref(null);
    const accept = ref(false);
    return {
      basic: ref(false),
      fixed: ref(false),

      name,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },

      onReset() {
        name.value = null;
        age.value = null;
        accept.value = false;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.q-card{
    padding: 20px;
    display: flex;
    justify-content: center;
   
}

.q-form{
    width: 100%;
    
}
</style>