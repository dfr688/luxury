import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Sort from '@/components/sort/Sort'
import Release from '@/components/release/Release'
import My from '@/components/my/My'
import Collection from '@/components/my/Collection'
import Browse from '@/components/my/Browse'
import MyRelease from '@/components/my/MyRelease'
import Suggest from '@/components/my/Suggest'
import Register from '@/components/login/Register'
import Login from '@/components/login/Login'
import Appraisal from '@/components/home/Appraisal'
import AppraisalDetail from '@/components/home/AppraisalDetail'
import Online from '@/components/home/Online'
import Idea from '@/components/home/Idea'
import IdeaDetail from '@/components/home/IdeaDetail'
import ProductDetail from '@/components/home/ProductDetail'
import SearchList from '@/components/home/SearchList'
import Brand from '@/components/sort/Brand'
import Type from '@/components/sort/Type'
import City from '@/components/city/City'
import SearchCity from '@/components/city/SearchCity'
import Skill from '@/components/home/Skill'
import SkillDetail from '@/components/home/SkillDetail'
import TypeList from '@/components/sort/TypeList'
import Search from '@/components/sort/Search'
import BrandList from '@/components/sort/BrandList'
import BrandGo from '@/components/home/BrandGo'
import Pravicy from '@/components/login/Pravicy'
// import Redirect from '@/components/public/Redirect'
import { Toast } from 'mint-ui';

Vue.use(Router)

const router =  new Router({
  routes: [
	 //  {
		// path: '/redirect',
	 //  	component: Redirect
	 //  },
		{
			path: '/home',
			name: 'home',
			component: Home
		},
		{
			path: '/sort',
			redirect: '/sort/brand',
			component: Sort,
			children: [
				{
					path: 'brand',
					name: 'brand',
					component: Brand
				},
				{
					path: 'type',
					name: 'type',
					component: Type
				}
			]
		},
		{
			path: '/release',
			name: 'release',
			component: Release,
			meta: {
			 	requiresAuth: true,
				keepAlive: false
			}
		},
		{
			path: '/my',
			name: 'my',
			component: My
		},
		{
			path: '/collection',
			name: "collection",
			component: Collection,
			meta: {
				requiresAuth: true
		   }
		},
		{
			path: '/browse',
			name: "browse",
			component: Browse,
			meta: {
				requiresAuth: true
		   }
		},
		{
			path: '/myrelease',
			name: 'myrelease',
			component: MyRelease,
			meta: {
				requiresAuth: true
		   }
		},
		{
			path: '/suggest',
			component: Suggest
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/appraisal',
			component: Appraisal
		},
		{
			path: '/appraisaldetail/:id',
			name: 'appraisaldetail',
			component: AppraisalDetail
		},
		{
			path: '/online',
			component: Online
		},
		{
			path: '/idea',
			component: Idea
		},
		{
			path: '/ideadetail/:id',
			name: 'ideadetail',
			component: IdeaDetail
		},
		{
			path: '/productdetail/:id',
			name: 'productdetail',
			component: ProductDetail
		},
		{
			path: '/searchlist',
			name: 'searchlist',
			component: SearchList,
			meta: {
			 	keepAlive: false
			}
		},
		{
			path: '/city',
			name: 'city',
			component: City
		},
		{
			path: '/searchcity',
			name: 'searchcity',
			component: SearchCity
		},
		{
			path: '/skill',
			component: Skill
		},
		{
			path: '/skilldetail/:id',
			name: 'skilldetail',
			component: SkillDetail
		},
		{
			path: '/typelist/:typeIndex',
			name: 'typelist',
			component: TypeList
		},
		{
			path: '/search',
			name: 'search',
			component: Search
		},
		{
			path: '/brandlist/:id',
			name: 'brandlist',
			component: BrandList
		},
    {
      path: '/brandgo',
      name: 'brandgo',
      component: BrandGo
    },
    {
      path: '/pravicy',
      component: Pravicy
    },
		{
			path: '*',
			redirect: '/home'
		}
  ]
});

//  路由权限控制 进入my组件时候 需要登录状态
     	router.beforeEach((to,from,next) => {
  		// console.log(to.meta.requiresAuth)
  		if(to.meta.requiresAuth){
  			// 如果不为空 说明已经登录 直接放行
 			// console.log(localStorage.getItem("token"));
  			if(localStorage.getItem("token")!= null){
  				next();
  			}else{
 				Toast({
					message: '请先登录！',
					duration: 1000
				});
  				next({path: "/login"});
  			}
  		}else{
  			next();
  		}
});

export default router;
