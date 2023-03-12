<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: none" reveal elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <DarkLightMode @getTheme="getTheme" />
      </q-toolbar>

      <div class="inner">
        <div class="q-pt-xl q-mb-md">
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_t1vwbSRRCD.json"
            background="transparent"
            speed="1"
            style="width: 50px; height: 50px"
            loop
            autoplay
          ></lottie-player>
          <div class="text-subtitle">
            {{ todaysDate }}
          </div>
        </div>

        <FormModal />
      </div>

      <q-img :src="photo" class="header-image absolute-top" />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="700"
    >
      <q-scroll-area
        style="
          height: calc(100% - 185px);
          margin-top: 185px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Todo </q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Help </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        :src="photo"
        style="height: 185px; filter: grayscale(20%)"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { date } from "quasar";
import FormModal from "src/components/FormModal.vue";
import DarkLightMode from "src/components/DarkLightMode.vue";
import city from "../assets/night.jpg";
import day from "../assets/city.jpg";

export default defineComponent({
  name: "MainLayout",

  data() {
    return {
      theme: false,
      city,
      day,
    };
  },
  components: {
    FormModal,
    DarkLightMode,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },

    photo() {
      return this.theme ? this.city : this.day;
    },
  },

  methods: {
    getTheme(param) {
      this.$emit("getTheme", param);
      this.theme = param;
    },
  },
});
</script>

<style lang="scss">
.q-toolbar,
.inner {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
}
.header-image {
  height: 100%;
  z-index: -1;
  opacity: 1;
  filter: grayscale(70%);
}

.inner {
  align-items: center;
  height: 100%;
  @media (max-width: 425px) {
    display: none;
  }
}
</style>
