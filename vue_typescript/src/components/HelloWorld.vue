<script setup lang="ts">

import {Reactive, reactive, ref, Ref} from "vue";

    const num: Ref<number> = ref(0);

    type Dog = {
        name: string;
        age: number;
    }
    const dog: Ref<Dog> = ref({
        name: '황구',
        age: 10
    });

    interface Props {
        title: string;
        dog: Dog;
        count: number;
    }

    const props = defineProps<Props>();

    const emits = defineEmits<{
        (e: 'onClick', id: number, age: number, title: string): void;
    }>();

    const onclick = () => {
        emits('onClick', 0, 20, '제목');
    }

    const onChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        console.log(target.value);
    }
</script>

<template>
    {{props.title}}
    {{props.dog}}
    {{props.count}}

    <button @click="onclick">클릭</button>
    <input type="text" @change="onChange" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
