<script setup lang="ts">
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import {onMounted, Ref, ref} from 'vue';
    import {setPageTitle} from '@/utils/title.js';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import {Router, useRouter} from 'vue-router';
    import {getStringedDate} from '@/utils/date.js';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import ViewerComponent from '@/components/ViewerComponent.vue';
    import {Diary} from "@/types/diary.ts";
    import {Button} from "@/types/button.ts";

    const props = defineProps<{
        id: number
    }>();
    const router: Router = useRouter();
    const diaryListStore = useDiaryListStore();

    const diary: Ref<Diary | undefined> = ref();

    // 자식 컴포넌트
    const headerLeftChild: Button = {
        component: ButtonComponent,
        text: '< 뒤로 가기',
        click: () => router.back()
    };
    const headerRightChild: Button = {
        component: ButtonComponent,
        text: '수정하기',
        click: () => router.push(`/edit/${props.id}`)
    };

    onMounted(() => {
        setPageTitle(`${props.id}번 일기`);

        diary.value = diaryListStore.getDiary(props.id);
        if(!diary.value) {
            alert('존재하지 않는 일기장입니다.');
            router.replace('/');
        }
    });
</script>

<template>
    <template v-if="diary">
    <HeaderComponent
        :title="`${getStringedDate(new Date(diary.createdDate))} 일기`"
        :left-child="headerLeftChild"
        :right-child="headerRightChild"/>
    <ViewerComponent
        :emotion-id="diary.emotionId"
        :content="diary.content"/>

    </template>
</template>

<style scoped>

</style>