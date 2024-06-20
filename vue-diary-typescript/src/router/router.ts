import {createRouter, createWebHistory, Router} from 'vue-router';
import {routes} from '@/router/routes.ts';

const router: Router = createRouter({
	history: createWebHistory(import.meta.env.VITE_BASE_URL),
	routes: routes
});

export default router;
