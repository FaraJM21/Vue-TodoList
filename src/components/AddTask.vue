<template>
  <div class="addTask" >
    <p>Add New Task</p>
    <q-form
      @submit="onSubmit"
      color="primary"
      @reset="onReset"
      class="q-gutter-md"
      style="width: 100%"
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      address: "",
      cost: null,
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

<style lang="scss">
.addTask {
  max-width: 350px;
  margin: auto;
  display: none;
  align-items: center;
  flex-direction: column;
  box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
  padding: 20px;
  @media (max-width:425px) {
    display: flex;
  }

}
</style>
