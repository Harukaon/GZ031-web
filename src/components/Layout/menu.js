export default [
    {
      id: '1',
      title: '制造执行MES',
      icon: 'el-icon-s-platform',
      children: [
        {
          id: '1-1',
          title: '质量管理',
          icon: 'el-icon-s-check',
          children: [
            {
              id: '1-1-1',
              title: '产品检验',
              path: '/quality/inspection'
            },
            {
              id: '1-1-2',
              title: '来料检验',
              path: '/quality/material-check'
            }
          ]
        },
        {
          id: '1-2',
          title: '生产管理',
          icon: 'el-icon-s-order',
          children: [
            {
              id: '1-2-1',
              title: '生产完工单',
              path: '/production/finish-order'
            }
          ]
        }
      ]
    }
  ]