import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useDiaryListStore = defineStore('diaryList', () => {
	const diaryList = ref([]);
	let idRef = ref(0);

	const setDiaryList = (list) => {
		diaryList.value = list;

		saveLocalStorage();
	}
	const getDiaryList = () => {
		return diaryList.value.map(diary => diary);
	}
	const getDiary = (id) => {
		return diaryList.value.find(diary => diary.id === id);

	};
	const addDiary = (diary) => {
		diaryList.value.push({
			id: idRef.value++,
			...diary
		});

		saveLocalStorage();
	};
	const removeDiary = (id) => {
		diaryList.value = diaryList.value.filter(diary => diary.id !== id);
		saveLocalStorage();
	};
	const updateDiary = (diary) => {
		diaryList.value = diaryList.value.map(item => item.id === diary.id ? diary : item);
		saveLocalStorage();
	};
	const setIdRef = (id) => {
		idRef.value = id;
	}

	const saveLocalStorage = () => {
		localStorage.setItem('diary', JSON.stringify(diaryList.value));
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