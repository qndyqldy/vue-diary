<script setup lang="ts">
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import {onMounted, Ref, ref} from 'vue';
    import {setPageTitle} from '@/utils/title.js';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import DiaryList from '@/components/DiaryList.vue';
    import {Button} from "@/types/button.ts";
    import {Diary} from "@/types/diary.ts";

    const diaryListStore = useDiaryListStore();
    const pivotDate: Ref<Date> = ref(new Date());

    const onIncreaseMonth = (): void => {
        pivotDate.value = new Date(pivotDate.value.getFullYear(), pivotDate.value.getMonth()+1);
    }
    const onDecreaseMonth = (): void => {
        pivotDate.value = new Date(pivotDate.value.getFullYear(), pivotDate.value.getMonth()-1);
    }

    // 자식 컴포넌트
    const headerLeftChild: Button = {
        component: ButtonComponent,
        text: '<',
        click: () => onDecreaseMonth()
    };
    const headerRightChild: Button = {
        component: ButtonComponent,
        text: '>',
        click: () => onIncreaseMonth()
    };

    let isLoading: Ref<boolean> = ref(true);

    onMounted(() => {
        setPageTitle('욱이 일기장');

        const storedData: string | null = localStorage.getItem('diary');
        if(!storedData) {
            isLoading.value = false;
            return;
        }
        const parsedData: (Diary[] | null) = JSON.parse(storedData);

        if(!Array.isArray(parsedData)) {
            isLoading.value = false;
            return;
        }

        let maxId: number = 0;
        parsedData.forEach((item: Diary) => {
            if((item.id as number) > maxId) {
                maxId = Number(item.id);
            }
        });

        diaryListStore.setIdRef(maxId + 1);
        diaryListStore.setDiaryList(parsedData);

        isLoading.value = false;
    });
</script>

<template>
    <HeaderComponent
        :title="`${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`"
        :left-child="headerLeftChild"
        :right-child="headerRightChild"/>
    <DiaryList v-if="!isLoading" :date="pivotDate"/>
</template>

<style scoped>

</style>