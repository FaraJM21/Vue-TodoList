<template>
  <div class="q-pt-xl q-mb-md" id="modal">
    <q-btn label="Add New Task" color="black" @click="fixed = true" />
    <q-dialog v-model="fixed">
      <q-card style="width: 900px">
        <h3>Add New Task</h3>
        <q-form
          @submit="onSubmit"
          color="primary"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input filled v-model="name" label="Name*" />

          <q-input filled v-model="address" label="Address*" lazy-rules />

          <q-input filled type="number" v-model.number="cost" label="Cost" />

          <div class="btns">
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      address: "",
      cost: null,
    };
  },
  setup() {
    return {
      basic: ref(false),
      fixed: ref(false),
    };
  },

  methods: {
    ...mapActions("todolist", ["ADD_NEW_TODOITEM"]),

    onSubmit() {
      if (this.name && this.address && this.cost) {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "New Item Added",
        });
        const data = {
          product_type_id: 0,
          name_uz: this.name,
          cost: this.cost,
          address: this.address,
          created_date: Date.now(),
        };
        this.ADD_NEW_TODOITEM(data);
        this.fixed = false;
        this.name = "";
        this.cost = null;
        this.address = "";
      } else {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to fill all the areas",
        });
      }
    },

    onReset() {
      this.name = "";
      this.address = "";
      this.cost = null;
    },
  },
};
</script>

<style lang="scss" scoped>

.q-card {
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h3 {
    text-align: center;
    font-size: 20px;
  }
}

.q-form {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .btns {
    margin-top: 35px;
  }
}
</style>
