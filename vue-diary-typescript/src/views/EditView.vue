<script setup lang="ts">
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import EditorComponent from '@/components/EditorComponent.vue';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import {Router, useRouter} from 'vue-router';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import {onMounted, Ref, ref} from 'vue';
    import {setPageTitle} from '@/utils/title.js';
    import {Diary, DiaryInput} from "@/types/diary.ts";
    import {Button} from "@/types/button.ts";

    const props = defineProps<{
        id: number;
    }>();
    const router: Router = useRouter();
    const diaryListStore = useDiaryListStore();
    const diary: Ref<Diary | undefined> = ref();

    const onClickDelete = (): void => {
        if(confirm('일기를 정말 삭제할까요?')) {
            diaryListStore.removeDiary(props.id);

            router.replace('/');
        }
    }

    const onSubmit = (diary: DiaryInput) => {
        if(confirm('일기를 정말 수정할까요?')) {
            diaryListStore.updateDiary({
                ...diary,
                createdDate: diary.createdDate.getTime()
            });

            router.replace('/');
        }
    }

    // 자식 컴포넌트
    const headerLeftChild: Button = {
        component: ButtonComponent,
        text: '< 뒤로 가기',
        click: () => router.back()
    };
    const headerRightChild: Button = {
        component: ButtonComponent,
        text: '삭제하기',
        type: 'NEGATIVE',
        click: () => onClickDelete()
    };

    onMounted(() => {
        setPageTitle(`${props.id}번 일기 수정`);

        diary.value = diaryListStore.getDiary(props.id);
        if(!diary.value) {
            alert('존재하지 않는 일기장입니다.');
            router.replace('/');
        }
    });
</script>

<template>
    <HeaderComponent
        title="일기 수정하기"
        :left-child="headerLeftChild"
        :right-child="headerRightChild"/>
    <EditorComponent
        v-if="diary"
        :init-data="diary"
        @on-submit="onSubmit"/>
</template>

<style scoped>

</style>