import {defineStore} from 'pinia';
import {Ref, ref} from 'vue';
import {Diary} from "@/types/diary.ts";

export const useDiaryListStore = defineStore('diaryList', () => {
	const diaryList: Ref<Diary[]> = ref([]);
	let idRef: Ref<number> = ref(0);

	const setDiaryList = (list: Diary[]): void => {
		diaryList.value = list;

		saveLocalStorage();
	}
	const getDiaryList = (): Diary[] => {
		return diaryList.value.map((diary: Diary) => diary);
	}
	const getDiary = (id: number): Diary | undefined => {
		return diaryList.value.find((diary: Diary) => diary.id === id);

	};
	const addDiary = (diary: Diary): void => {
		diaryList.value.push({
			...diary,
			id: idRef.value++
		});

		saveLocalStorage();
	};
	const removeDiary = (id: number): void => {
		diaryList.value = diaryList.value.filter((diary: Diary) => diary.id !== id);
		saveLocalStorage();
	};
	const updateDiary = (diary: Diary): void => {
		diaryList.value = diaryList.value.map((item: Diary) => item.id === diary.id ? diary : item);
		saveLocalStorage();
	};
	const setIdRef = (id: number): void => {
		idRef.value = id;
	}

	const saveLocalStorage = (): void => {
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