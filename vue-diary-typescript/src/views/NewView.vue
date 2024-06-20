<script setup lang="ts">
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import EditorComponent from '@/components/EditorComponent.vue';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import {Router, useRouter} from 'vue-router';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import {DiaryInput} from "@/types/diary.ts";
    import {Button} from "@/types/button.ts";

    const router: Router = useRouter();
    const diaryListStore = useDiaryListStore();
    const onSubmit = (diary: DiaryInput): void => {
        diaryListStore.addDiary({
            ...diary,
            createdDate: diary.createdDate.getTime()
        });
        router.replace('/');
    }

    // 자식 컴포넌트
    const headerLeftChild: Button ={
        component: ButtonComponent,
        text: '< 뒤로 가기',
        click: () => router.back()
    };
</script>

<template>
    <div>
        <HeaderComponent
            title="새 일기 쓰기"
            :left-child="headerLeftChild" />
        <EditorComponent
            @on-submit="onSubmit"/>
    </div>
</template>

<style scoped>

</style>