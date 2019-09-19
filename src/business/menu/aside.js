// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '酒店示例',
    icon: 'folder-o',
    children: [
      { path: '/hotel/dashboard', title: '工作台' },
      { path: '/hotel/room/list', title: '房间管理' },
      { path: '/hotel/room/checkin', title: '入住管理' },
      { path: '/hotel/room/type', title: '房间类型管理' }
    ]
  },
  {
    title: '设置',
    icon: 'folder-o',
    children: [
      { path: '/hotel/info', title: '酒店信息' },
      { path: '/hotel/test', title: '测试页面' }
    ]
  }
]
