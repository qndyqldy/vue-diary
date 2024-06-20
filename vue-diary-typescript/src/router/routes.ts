import {RouteRecordRaw} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";
import DiaryView from "@/views/DiaryView.vue";
import NewView from "@/views/NewView.vue";
import EditView from "@/views/EditView.vue";

export const routes: RouteRecordRaw[] = [
	{
		path: '',
		redirect: '/home'
	},
	{
		path: '/home',
		component: HomeView
	},
	{
		path: '/diary/:id',
		component: DiaryView,
		props: (route) => {
			return {
				...route.params,
				...{id: Number(route.params.id)}
			}
		}
	},
	{
		path: '/edit/:id',
		component: EditView,
		props: (route) => {
			return {
				...route.params,
				...{id: Number(route.params.id)}
			}
		}
	},
	{
		path: '/new',
		component: NewView
	},
	{
		path: '/:pathMatch(.*)*',
		component: NotFound
	},
]