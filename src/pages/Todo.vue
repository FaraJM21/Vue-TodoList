<template>
  <q-page class="bg-grey-3 column">
     <q-list class="bg-white" separator bordered>
      <q-item
        v-ripple
        v-for="task in TODOLIST"
        :key="task.id"
        clickable
        :class="[task.done && 'done bg-blue-1']"
      >
        <q-item-section>
          <q-item-label>{{ task.name_uz }} </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            color="primary"
            @click.stop="deleteTask(task)"
            icon="delete"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="no-tasks absolute-center" v-if="!TODOLIST.length">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

export default defineComponent({
 

  data() {
    return {
      newTask: "",
      cost: 0,
    };
  },

  computed: {
    ...mapGetters("todolist", ["TODOLIST"]),
  },
  methods: {
    ...mapActions("todolist", [
      "GET_USERS_FROM_API",
      "DELETE_TODOITEM",
      "ADD_NEW_TODOITEM",
    ]),

    deleteTask(el) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you really want to delete?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.$q.notify({
            color: "warning",
            message: `${el.name_uz} deleted`,
          });
          this.DELETE_TODOITEM(el.id);
        });
    },

    addTask() {
      const data = {
        product_type_id: 0,
        name_uz: this.newTask,
        cost: 150.0,
        address: "Chilonzor",
        created_date: Date.now(),
      };

      this.ADD_NEW_TODOITEM(data);
      this.newTask = "";
    },
  },

  mounted() {
    this.GET_USERS_FROM_API();
  },
});
</script>

<style lang="scss">
.q-item__label {
  text-transform: capitalize;
}

.no-tasks {
  opacity: 0.5;
}
</style>
