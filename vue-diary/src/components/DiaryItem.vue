<script setup>
    import {useRouter} from 'vue-router';
    import {getEmotionImage} from '../util/emotion.js';
    import ButtonComponent from './ButtonComponent.vue';
    import {useDiaryListStore} from '../stores/diary-list-store.js';

    const props = defineProps({
        id: Number,
        emotionId: Number,
        createdDate: Number,
        content: String
    });
    const router = useRouter();
    const diaryListStore = useDiaryListStore();

    const onClickDelete = () => {
        diaryListStore.removeDiary(props.id);
    }

</script>

<template>
    <div class="DiaryItem">
        <div
            class="img_section"
            :class="'img_section_' + props.emotionId"
            @click="router.push(`/diary/${id}`)">
            <img :src="getEmotionImage(props.emotionId)" />
        </div>
        <div
            class="info_section"
            @click="router.push(`/diary/${id}`)">
            <div class="created_date">
                {{new Date(props.createdDate).toLocaleDateString()}}
            </div>
            <div class="content">
                {{props.content}}
            </div>
        </div>
        <div class="button_section">
            <ButtonComponent
                text="수정하기"
                @on-click="router.push(`/edit/${id}`)"/>
            <ButtonComponent
                text="삭제하기"
                type="NEGATIVE"
                @on-click="onClickDelete"/>
        </div>
    </div>

</template>

<style scoped>
    .DiaryItem {
        display: flex;
        gap: 15px;
        justify-content: space-between;

        padding: 15px 0px;
        border-bottom: 1px solid rgb(236, 236, 236);
    }

    .DiaryItem .img_section {
        min-width: 120px;
        height: 80px;

        display: flex;
        justify-content: center;
        cursor: pointer;

        border-radius: 5px;
    }
    .DiaryItem .img_section > img {
        width: 50%;
    }

    .DiaryItem .img_section_1 {
        background-color: rgb(100, 201, 100);
    }
    .DiaryItem .img_section_2 {
        background-color: rgb(157, 215, 114);
    }
    .DiaryItem .img_section_3 {
        background-color: rgb(253, 206, 23);
    }
    .DiaryItem .img_section_4 {
        background-color: rgb(253, 132, 70);
    }
    .DiaryItem .img_section_5 {
        background-color: rgb(253, 86, 95);
    }

    .DiaryItem .info_section {
        flex: 1;
        cursor: pointer;
    }

    .DiaryItem .info_section .created_date {
        font-weight: bold;
        font-size: 25px;
    }

    .DiaryItem .info_section .content {
        font-size: 18px;
    }

    .DiaryItem .button_section {
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 70px;
    }
</style>