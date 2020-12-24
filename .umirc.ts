import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  routes: [
    // { path: '/', component: '@/pages/index' },
    {path:'/', component: 'Login'},
    {path:'/register', component: 'Register'},
    {path:'/login', component: 'Login'},
    {path:'/home', component: 'Home'},
    {path:'/details',exact: false, component: 'Details'},
    {path:'/userinfo', component: 'UserInfo'},
    {path:'/atmia', component: 'Atmia'},
     

  ],
  proxy: {
    '/api': {
      target: 'http://175.24.120.91:8001',
      pathRewrite: { '^/api': '' },
      changeOrigin: true
    }
  },
  scripts: [
    'https://webapi.amap.com/maps?v=1.4.15&key=742d55cec9c320cfe5942d613c870978',
  ]
});
