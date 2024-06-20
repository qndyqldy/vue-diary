<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {ref, Ref} from "vue";

type Dog = {
    name: string;
    age: number;
}
const dog: Ref<Dog> = ref({
    name: '황구',
    age: 10
});

const onClick = (id: number, age: number, title: string) => {
    console.log(`${id} - ${age} - ${title}`);
}
</script>

<template>

  <HelloWorld :dog="dog" title="제목" :count="30" @on-click="onClick"/>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
