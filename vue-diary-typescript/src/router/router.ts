import {createRouter, createWebHistory, Router} from 'vue-router';
import {routes} from '@/router/routes.ts';

const router: Router = createRouter({
	history: createWebHistory(),
	routes: routes
});

export default router;
