const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/playlist/:id',
        name: 'playlist',
        component: () => import('pages/PlayList.vue'),
        props: true
      },
      {
        path: '/artist/:id',
        name: 'artist',
        component: () => import('pages/Artist.vue'),
        props: true
      },
      {
        path: '/mv/:id',
        name: 'mv',
        component: () => import('pages/Mv.vue'),
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
