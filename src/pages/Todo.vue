<template>
  <q-page>
    <div class="q-pa-md">
      <q-markup-table flat bordered>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left">Address</th>
            <th class="text-center">Cost</th>
            <th class="text-center">Date</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody v-for="task in TODOLIST" :key="task.id">
          <tr>
            <td class="text-left">{{ task.name_uz }}</td>
            <td class="text-left">{{ task.address }}</td>
            <td class="text-center">{{ task.cost }} uzs</td>
            <td class="text-center">{{ task.created_date }}</td>
            <td class="text-center">
              <q-btn
                flat
                round
                color="primary"
                @click.stop="deleteTask(task)"
                icon="delete"
              />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>



    <AddTask/>

    <div class="cards">
      <Cards
        v-for="todo in TODOLIST"
        :key="todo.id"
        :todo="todo"
        @removeCard="removeCard"
      />
    </div>

  

    <div class="no-tasks absolute-center" v-if="!TODOLIST.length">
      <q-icon name="check" size="100px" color="primary" />
      <div class="text-h5 text-primary text-center">No tasks</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import Cards from "src/components/Cards.vue";
import AddTask from "src/components/AddTask.vue";

export default defineComponent({
  components: {
    Cards,
    AddTask,
  },
  computed: {
    ...mapGetters("todolist", ["TODOLIST"]),
  },
  methods: {
    ...mapActions("todolist", ["GET_USERS_FROM_API", "DELETE_TODOITEM"]),

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

    removeCard(el) {
      this.$emit("removeCard", el);

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
  },

  mounted() {
    this.GET_USERS_FROM_API();
  },
});
</script>

<style lang="scss">
.q-markup-table {
  @media (max-width: 540px) {
    display: none;
  }
}
tr {
  td:first-child,
  td:nth-child(2) {
    text-transform: capitalize;
  }
}

.cards {
  width: 100%;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 16px 0;

  @media (max-width: 540px) {
    display: flex;
    width: 90%;
    margin: auto;
  }
}

.no-tasks {
  opacity: 0.5;
}
</style>
