<script setup lang="ts">
import {onMounted, Ref, ref} from 'vue';
    import {getStringedDate} from '@/utils/date.js';
    import {Router, useRouter} from 'vue-router';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import EmotionItem from '@/components/EmotionItem.vue';
    import {emotionList} from '@/utils/emotion.js';
import {Diary, DiaryInput} from "@/types/diary.ts";

    const props = defineProps<{
        initData?: Diary
    }>();
    const emits = defineEmits<{
        (e: 'onSubmit', value: DiaryInput): void;
    }>();

    const router: Router = useRouter();

    const input: Ref<DiaryInput> = ref({
        createdDate: new Date(),
        emotionId: 3,
        content: ''
    });

    const onChange = (e: Event): void => {
        const target = e.target as HTMLSelectElement;

        let name = target.name as keyof DiaryInput;
        let value: DiaryInput[keyof DiaryInput];

        if(name === 'createdDate') {
            value = new Date(target.value);
        } else if(name === 'emotionId') {
            value = Number(target.value);
        } else {
            value = target.value;
        }

        // input에 name property가 있는지 확인 후
        // value의 타입으로 단언 후 값 설정
        if (name in input.value) {
            (input.value[name] as typeof value) = value;
        }
    }

    const onClickEmotion = (emotionId: number): void => {
        input.value.emotionId = emotionId;
    }

    const onClickSubmit = (): void => {
        emits('onSubmit', {...input.value, createdDate: input.value.createdDate});
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