<script setup>
    import {getEmotionImage} from '@/util/emotion.js';

    const props = defineProps({
        emotionId: Number,
        emotionName: String,
        isSelected: Boolean
    })

    const emits = defineEmits(['onClick']);
</script>

<template>
    <div
        class="EmotionItem"
        :class="props.isSelected ? 'EmotionItem_on_' + props.emotionId : ''"
        @click="emits('onClick')">
        <img class="emotion_img" :src="getEmotionImage(props.emotionId)">
        <div class="emotion_name">{{props.emotionName}}</div>
    </div>
</template>

<style scoped>
    .EmotionItem {
        background-color: rgb(236, 236, 236);
        padding: 20px;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
    }
    .EmotionItem_on_1 {
        color: white;
        background-color: rgb(100, 201, 100);
    }
    .EmotionItem_on_2 {
        color: white;
        background-color: rgb(157, 215, 114);
    }
    .EmotionItem_on_3 {
        color: white;
        background-color: rgb(253, 206, 23);
    }
    .EmotionItem_on_4 {
        color: white;
        background-color: rgb(253, 132, 70);
    }
    .EmotionItem_on_5 {
        color: white;
        background-color: rgb(253, 86, 95);
    }

    .EmotionItem .emotion_img {
        width: 50%;
        margin-bottom: 10px;
    }
</style>