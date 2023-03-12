<template>
  <q-card flat bordered class="my-card">
    <div class="text-h6">Card</div>
   

    <q-separator inset />
    <div class="card-wrapper">
      <div class="inner">
        <q-card-section>Name </q-card-section>

        <q-card-section> {{ todo.name_uz }} </q-card-section>
      </div>

      <div class="inner">
        <q-card-section>Address</q-card-section>
        <q-card-section> {{ todo.address }} </q-card-section>
      </div>

      <div class="inner">
        <q-card-section> Cost </q-card-section>
        <q-card-section> {{ todo.cost }} </q-card-section>
      </div>

      <div class="inner">
        <q-card-section>Date</q-card-section>
        <q-card-section> {{ todo.created_date }} </q-card-section>
      </div>
    </div>
    <q-separator inset />

    <div class="card-inner">
      <q-btn
        flat
        round
        color="primary"
        icon="delete"
        @click="$emit('removeCard', todo.id)"
      />
    </div>
  </q-card>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.text-h6 {
  text-align: center;
}
.my-card {
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  @media (max-width:350px) {
    padding: 0;
  }
}

.card-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;

  .inner {
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-transform: capitalize;
  }
}

.card-inner {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
