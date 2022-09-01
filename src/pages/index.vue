<!-- src/pages/pinia/index.vue -->

<template>
  <div class="pinia">
    <h3 class="name">用户名:{{ userStore.name }}</h3>
    <h3 class="length">长度:{{ userStore.nameLength }}</h3>
    <van-button type="primary" @click="updateName(true)"
      >action修改store中的name</van-button
    >
    <van-button @click="updateName(false)">patch修改store中的name</van-button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store";

const userStore = useUserStore();

const updateName = (isAction: boolean) => {
  if (isAction) {
    // action 修改 store 中的数据
    userStore.updateName("李四");
  } else {
    // 未定义 action 时可以用 $patch 方法直接更改状态属性
    // $patch 修改 store 中的数据
    userStore.$patch({
      name: "lisi",
    });
  }
};
</script>
