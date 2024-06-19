<script setup>
    import {computed, ref} from 'vue';
    import DiaryItem from '@/components/DiaryItem.vue';
    import ButtonComponent from '@/components/ButtonComponent.vue';
    import {useRouter} from 'vue-router';
    import {useDiaryListStore} from '@/stores/diary-list-store.js';
    import {storeToRefs} from 'pinia';

    const router = useRouter();
    const props = defineProps({
        date: Date
    })

    const diaryListStore = useDiaryListStore();
    const {diaryList} = storeToRefs(diaryListStore)
    const getMonthlyData = (date, list) => {
        const beginTime = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0).getTime();
        const endTime = new Date(date.getFullYear(), date.getMonth()+1, 0, 23, 59, 59).getTime();
        return list.filter(item => beginTime <= item.createdDate && item.createdDate <= endTime);
    }

    const monthlyData = computed(() => {
        return getMonthlyData(props.date, diaryList.value);
    });

    const sortType = ref('latest');

    const getSortedList = computed(() => {
        return getMonthlyData(props.date, diaryList.value).toSorted((a, b) => {
            if(sortType.value === 'latest') {
                return Number(a.createdDate) - Number(b.createdDate);
            } else {
                return Number(b.createdDate) - Number(a.createdDate);
            }
        })
    });
</script>

<template>
    <div class="DiaryList">
        <div class="menu_bar">
            <select v-model="sortType">
                <option value="latest">최신순</option>
                <option value="oldest">오래된 순</option>
            </select>
            <ButtonComponent
                text="새 일기 쓰기"
                type="POSITIVE"
                @on-click="router.push('/new')"
            />
        </div>
        <div class="list_wrapper">
            <template v-if="monthlyData.length > 0">
                <DiaryItem v-for="diary in getSortedList"
                    :key="diary.id"
                    :id="diary.id"
                    :emotion-id="diary.emotionId"
                    :created-date="diary.createdDate"
                    :content="diary.content"/>
            </template>
        </div>
    </div>
</template>

<style scoped>
    .DiaryList .menu_bar {
        display: flex;
        margin: 20px 0px;
        gap: 10px;
    }

    .DiaryList .menu_bar select {
        background-color: rgb(236, 236, 236);
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        cursor: pointer;
    }

    .DiaryList .menu_bar button {
        flex: 1;
    }
</style>