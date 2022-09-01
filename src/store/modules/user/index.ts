import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => {
    return {
      name: "张三",
    };
  },
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    updateName(name: string) {
      this.name = name;
    },
  },
});
