<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import EditorComponent from '@/components/EditorComponent.vue';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import {useRouter} from 'vue-router';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';

    const router = useRouter();
    const diaryListStore = useDiaryListStore();
    const onSubmit = (diary) => {
        diaryListStore.addDiary({
            ...diary,
            createdDate: diary.createdDate.getTime()
        });
        router.back();
    }

    // 자식 컴포넌트
    const headerLeftChild ={
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