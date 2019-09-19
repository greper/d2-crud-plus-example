export const crudOptions = {
  columns: [
    {
      title: '日期',
      key: 'date',
      sortable: true,
      type: 'date',
      search: {
        columnName: 'device_name',
        search: false
      },
      form: {
        addDisabled: true,
        rules: [
          { required: true, message: '请输入日期' }
        ]
      }
    },
    {
      title: '姓名',
      key: 'name',
      sortable: true,
      search: {
        columnName: 'device_name',
        search: false
      },
      type: 'select',
      form: {
        rules: [{ required: true, message: '请输入姓名' }]
      },
      dict: {
        url: '/hotel/basic/dicts/OtaDownTypeEnum'
      }
    },
    {
      title: '地址', //  label: '设备名字',
      key: 'address', // prop: 'deviceName',
      sortable: true,
      search: {
        columnName: 'device_name',
        search: false
      },
      type: 'select',
      form: {
        rules: [{ required: true, message: '请输入地址' }]
      },
      dict: {
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }]
      }

    }
  ]
}
