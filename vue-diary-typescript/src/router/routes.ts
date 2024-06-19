// import HomeView from '@/views/HomeView.vue';
// import DiaryView from '@/views/DiaryView.vue';
// import EditView from '@/views/EditView.vue';
// import NewView from '@/views/NewView.vue';
// import NotFound from '@/views/NotFound.vue';


import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

export const routes: RouteRecordRaw[] = [
	{
		path: '',
		component: HomeView
	},
	{
		path: '/:pathMatch(.*)*',
		component: NotFound
	},
]