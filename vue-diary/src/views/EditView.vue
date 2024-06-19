<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import EditorComponent from '@/components/EditorComponent.vue';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import {useRouter} from 'vue-router';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import {onMounted, ref} from 'vue';
    import {setPageTitle} from '@/util/title.js';

    const props = defineProps({
        id: Number
    });
    const router = useRouter();
    const diaryListStore = useDiaryListStore();
    const diary = ref(null);

    const onClickDelete = () => {
        if(confirm('일기를 정말 삭제할까요?')) {
            diaryListStore.removeDiary(props.id);

            router.replace('/');
        }
    }

    const onSubmit = (diary) => {
        if(confirm('일기를 정말 수정할까요?')) {
            diaryListStore.updateDiary({
                ...diary,
                createdDate: diary.createdDate.getTime()
            });

            router.replace('/');
        }
    }

    // 자식 컴포넌트
    const headerLeftChild ={
        component: ButtonComponent,
        text: '< 뒤로 가기',
        click: () => router.back()
    };
    const headerRightChild = {
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