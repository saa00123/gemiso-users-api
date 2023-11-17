import { createApp } from "vue";
import UserComponent from "./components/UserComponent.vue";

const app = createApp({});
app.component("user-component", UserComponent);
app.mount("#app");
