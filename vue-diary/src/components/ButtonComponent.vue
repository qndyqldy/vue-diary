<script setup>
    const props = defineProps({
        text: String,
        type: String
    });
    const emits = defineEmits(['onClick'])
</script>

<template>
    <button
        class="Button"
        :class="`Button_${props.type}`"
        @click="emits('onClick')">{{props.text}}</button>
</template>

<style scoped>
    .Button {
        background-color: rgb(236, 236, 236);
        cursor: pointer;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        white-space: nowrap;
    }

    .Button_POSITIVE {
        background-color: rgb(100, 201, 100);
        color: white;
    }
    .Button_NEGATIVE {
        background-color: rgb(253, 86, 95);
        color: white;
    }
</style>