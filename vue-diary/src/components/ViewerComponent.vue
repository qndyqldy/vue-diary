<script setup>
    import {emotionList, getEmotionImage} from '@/util/emotion.js';

    const props = defineProps({
        emotionId: Number,
        content: String
    });

    const emotionItem = emotionList.find(item => item.emotionId === props.emotionId);
</script>

<template>
    <div class="Viewer">
        <section class="img_section">
            <h4>오늘의 감정</h4>
            <div
                class="emotion_img_wrapper"
                :class="'emotion_img_wrapper_' + props.emotionId">
                <img :src="getEmotionImage(props.emotionId)"/>
                <div>{{emotionItem.emotionName}}</div>
            </div>
        </section>

        <section class="content_section">
            <h4>오늘의 일기</h4>
            <div class="content_wrapper">
                <p>{{props.content}}</p>
            </div>
        </section>
    </div>
</template>

<style scoped>
    .Viewer > section {
        width: 100%;
        margin-bottom: 100px;

        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .Viewer > section > h4 {
        font-size: 22px;
        font-weight: bold;
    }

    .Viewer .emotion_img_wrapper {
        width: 250px;
        height: 250px;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        color: white;
        font-size: 25px;
    }

    .Viewer .emotion_img_wrapper_1 {
        background-color: rgb(100, 201, 100);
    }
    .Viewer .emotion_img_wrapper_2 {
        background-color: rgb(157, 215, 114);
    }
    .Viewer .emotion_img_wrapper_3 {
        background-color: rgb(253, 206, 23);
    }
    .Viewer .emotion_img_wrapper_4 {
        background-color: rgb(253, 132, 70);
    }
    .Viewer .emotion_img_wrapper_5 {
        background-color: rgb(253, 86, 95);
    }

    .Viewer .content_wrapper {
        width: 100%;
        background-color: rgb(236, 236, 236);
        border-radius: 5px;

        word-break: keep-all;
        overflow-wrap: break-word;
    }

    .Viewer .content_wrapper > p {
        padding: 20px;
        text-align: left;
        font-size: 20px;
        font-weight: 400;
        line-height: 2.5;
    }
</style>