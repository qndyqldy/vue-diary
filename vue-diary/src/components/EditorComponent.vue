<script setup>
import {onMounted, ref} from 'vue';
    import {getStringedDate} from '../util/date.js';
    import {useRouter} from 'vue-router';
    import ButtonComponent from './ButtonComponent.vue';
    import EmotionItem from './EmotionItem.vue';
    import {emotionList} from '../util/emotion.js';

    const props = defineProps({
        initData: Object
    });
    const emits = defineEmits(['onSubmit']);

    const router = useRouter();

    const input = ref({
        createdDate: new Date(),
        emotionId: 3,
        content: ''
    });

    const onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if(name === 'createdDate') {
            value = new Date(value);
        }

        input.value[name] = value;
    }

    const onClickEmotion = (emotionId) => {
        input.value.emotionId = emotionId;
    }

    const onClickSubmit = () => {
        emits('onSubmit', {...input.value});
    }

    onMounted(() => {
        if(props.initData) {
            input.value = {
                ...props.initData,
                createdDate: new Date(Number(props.initData.createdDate))
            };
        }
    })
</script>

<template>
    <div class="Editor">
        <section class="date_section">
            <h4>오늘의 날짜</h4>
            <input
                type="date" name="createdDate"
                :value="getStringedDate(input.createdDate)"
                @change="onChange" />
        </section>
        <section class="emotion_section">
            <h4>오늘의 감정</h4>
            <div class="emotion_list_wrapper">
                <emotion-item
                    v-for="emotion in emotionList"
                    :key="emotion.emotionId"
                    :emotion-id="emotion.emotionId"
                    :emotion-name="emotion.emotionName"
                    :is-selected="emotion.emotionId === input.emotionId"
                    @click="onClickEmotion(emotion.emotionId)"/>
            </div>
        </section>
        <section class="content_section">
            <h4>오늘의 일기</h4>
            <textarea
                name="content"
                :value="input.content"
                @change="onChange">
            </textarea>
        </section>
        <section class="button_section">
            <ButtonComponent
                text="취소하기"
                @on-click="router.back()" />
            <ButtonComponent
                text="작성완료"
                type="POSITIVE"
                @on-click="onClickSubmit" />
        </section>
    </div>
</template>

<style scoped>
    .Editor > section {
        margin-bottom: 40px;
    }

    .Editor > section > h4 {
        font-size: 22px;
        font-weight: bold;
    }

    .Editor > section > input, textarea {
        background-color: rgb(236, 236, 236);
        border: none;
        border-radius: 5px;
        font-size: 20px;
        padding: 10px 20px;
    }

    .Editor > section > textarea {
        padding: 20px;
        width: 100%;
        min-height: 200px;
        resize: vertical;
        box-sizing: border-box;
    }

    .Editor .emotion_section .emotion_list_wrapper {
        display: flex;
        justify-content: space-around;
        gap: 2%;
    }

    .Editor .button_section {
        display: flex;
        justify-content: space-between;
    }
</style>