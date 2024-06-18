import HomeView from '../views/HomeView.vue';
import DiaryView from '../views/DiaryView.vue';
import EditView from '../views/EditView.vue';
import NewView from '../views/NewView.vue';
import NotFound from '../views/NotFound.vue';


export const routes = [
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