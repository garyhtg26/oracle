import Index from './components/Index.vue';
import ProductDetails from './components/ProductDetails.vue';
import Login from './components/auth/Login.vue';
import Register from './components/auth/Register.vue';
import ProductList from './components/ProductList.vue';
import Premium from './components/Premium.vue';


export const routes = [
	{path: '/', component: Index, name: 'mainpage'},
	{path: '/product/:id', component: ProductDetails, name: 'product'},
	{path: '/list', component: ProductList, name: 'productlist'},
	{path: '/premium', component: Premium, name: 'premium'},
	{path: '/login', component: Login, name: 'login', onlyGuest: true },
	{path: '/register', component: Register, name: 'register', onlyGuest: true},

	{path: '*', redirect: '/' }
];