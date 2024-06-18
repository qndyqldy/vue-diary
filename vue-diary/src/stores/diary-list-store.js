import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useDiaryListStore = defineStore('diaryList', () => {

	const diaryList = ref([]);
	let idRef = ref(0);

	const setDiaryList = (list) => {
		diaryList.value = list;

		localStorage.setItem('diary', JSON.stringify(diaryList.value));
	}
	const getDiaryList = () => {
		return diaryList.value.map(diary => diary);
	}
	const getDiary = (id) => {
		return diaryList.value.find(diary => diary.id === id);

	};
	const addDiary = (diary) => {
		console.log('add');
		diaryList.value.push({
			id: idRef.value++,
			...diary
		});

		localStorage.setItem('diary', JSON.stringify(diaryList.value));
	};
	const removeDiary = (id) => {
		diaryList.value = diaryList.value.filter(diary => diary.id !== id);
		localStorage.setItem('diary', JSON.stringify(diaryList.value));
	};
	const updateDiary = (diary) => {
		diaryList.value = diaryList.value.map(item => item.id === diary.id ? diary : item);
		localStorage.setItem('diary', JSON.stringify(diaryList.value));
	};
	const setIdRef = (id) => {
		idRef.value = id;
	}

	return {
		diaryList,
		setDiaryList,
		getDiaryList,
		getDiary,
		addDiary,
		removeDiary,
		updateDiary,
		setIdRef
	}
});