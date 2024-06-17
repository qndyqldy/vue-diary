<script setup>

import {computed, ref} from 'vue';
import DiaryItem from './DiaryItem.vue';

    const props = defineProps({
        list: Array
    });

    const sortType = ref('latest');
    const getSortedList = computed(() => {
        return props.list.toSorted((a, b) => {
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
            <select :value="sortType">
                <option value="latest">최신순</option>
                <option value="oldest">오래된 순</option>
            </select>
        </div>
        <div class="list_wrapper">
            <template v-if="props.list.length > 0">
                <DiaryItem v-for="diary in getSortedList"
                    :key="diary.id"
                    {...diary} />
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