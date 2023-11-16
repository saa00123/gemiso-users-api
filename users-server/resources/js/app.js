import { createApp } from "vue";
import UserComponent from "./components/UserComponent.vue";

const app = createApp({});
app.component("UserComponent", UserComponent);
app.mount("#app");
