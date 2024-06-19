<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import {onMounted, ref} from 'vue';
    import {setPageTitle} from '@/util/title.js';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import DiaryList from '@/components/DiaryList.vue';

    const diaryListStore = useDiaryListStore();
    const pivotDate = ref(new Date());

    const onIncreaseMonth = () => {
        pivotDate.value = new Date(pivotDate.value.getFullYear(), pivotDate.value.getMonth()+1);
    }
    const onDecreaseMonth = () => {
        pivotDate.value = new Date(pivotDate.value.getFullYear(), pivotDate.value.getMonth()-1);
    }

    // 자식 컴포넌트
    const headerLeftChild ={
        component: ButtonComponent,
        text: '<',
        click: () => onDecreaseMonth()
    };
    const headerRightChild = {
        component: ButtonComponent,
        text: '>',
        click: () => onIncreaseMonth()
    };

    let isLoading = ref(true);
    onMounted(() => {
        setPageTitle('욱이 일기장');

        const storedData = localStorage.getItem('diary');
        if(!storedData) {
            isLoading.value = false;
            return;
        }
        const parsedData = JSON.parse(storedData);

        if(!Array.isArray(parsedData)) {
            isLoading.value = false;
            return;
        }

        let maxId = 0;
        parsedData.forEach(item => {
            if(Number(item.id) > maxId) {
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