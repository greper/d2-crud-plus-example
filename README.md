
# d2-crud-plus-example
基于d2-admin的d2-crud-plus的示例

# d2-crud-plus
基于d2-admin 的 d2-crud 的扩展,简化d2-crud配置，快速开发crud功能。    
https://github.com/greper/d2-crud-plus   

## 特性
以约定优于配置原则简化d2-crud繁琐的配置，只需要配置column即可。   

### 1. 简化addTemplate、editTemplate配置 

addTemplate、editTemplate根据column配置自动生成

### 2. 简化component配置   
column用type字段来自动配置component    
同时也支持自定义组件    
**目前支持**：   
 * input【默认】   
 * select【单选、多选、搜索选择】   
 * date类：datepicker【单个日期、日期段】、 datetimepicker【单个时间、时间段】、timepicker
 * 陆续增加中   
 
### 3. 根据column配置开启关闭顶部查询
* column中可以配置各个字段是否开启search

### 4. 枚举字典功能  
* 支持本地和远程获取
* 轻松实现数据存的是value值，需要对应字典的label来展示，配合select等使用更佳

### 5. d2-crud-x,基于d2-crud的修改版，功能与d2-crud一致【可选】
见【https://github.com/greper/d2-crud/
* 支持隐藏表格，自定义列表展示方式【配置options.hide=true】
* 支持slot编写各个字段的form表单

## 快速开始
### 1.安装
```shell
npm i  @d2-project/d2-crud  d2-crud-plus  -S
```
### 2.引入
 ```javascript
import d2Crud from '@d2-project/d2-crud'
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2Crud)
Vue.use(d2CrudPlus)

// 如果需要slot功能，要将d2-crud替换为d2-crud-x【功能与d2-crud一致】，代码如下
import d2CrudX from 'd2-crud-plus/d2-crud-x'
import { d2CrudPlus } from 'd2-crud-plus'
Vue.use(d2CrudX)
Vue.use(d2CrudPlus)

 ```
### 3. crud配置
```javascript
export const crudOptions = {
  columns: [
    {
      title: '日期',
      key: 'createDate',
      sortable: true, 
      type: 'date', //字段类型为时间选择器datepicker,根据类型可自动生成默认配置
      search: {//查询配置，默认启用查询
        key: 'create_date',//【可选】查询字段，默认为column.key
        disabled: true, //【可选】true禁止查询,默认为false
        component:{}//
      },
      form: {//form表单的配置
        disabled: true, //【可选】添加和修改均禁用本字段，默认false
      }
    },
    {
      title: '状态',
      key: 'status',
      sortable: true,
      search: {
        disabled: false //启用查询，默认启用
      },
      type: 'select', //字段类型为选择框
      form: { //配置添加和编辑，根据form的配置自动生成addTemplate和editTemplate
        rules: [//【可选】添加和修改时的校验规则，不配置则不校验
          { required: true, message: '请选择状态' }
        ]
      },
      dict: { //数据字典配置
        url: '/api/dicts/StatusEnum' //远程获取数据字典
      }
    },
    {
      title: '地区', 
      key: 'province', 
      sortable: true,
      search: {
        disabled: false //启用查询
      },
      type: 'select', //字段类型为选择框
      form: {
        rules: [{ required: true, message: '请选择地区' }],
        component: { //添加和修改时form表单的组件
          props: { //配置自定义组件的属性
            filterable: true, //可过滤选择项
            multiple: true, //支持多选
            clearable: true //可清除
          }
        }
      },
      dict: {  //本地数据字典
        data: [{ value: 'sz', label: '深圳' }, { value: 'gz', label: '广州' }, { value: 'wh', label: '武汉' }, { value: 'sh', label: '上海' }]
      }
    }
  ]
}
``` 
### 4. page
大部分页面都一样，通常复制即可
```
<template>
  <d2-container>
    <template slot="header">测试页面</template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" ></crud-search>
    <d2-crud
        ref="d2Crud"
        :columns="crud.columns"
        :data="crud.list"
        :rowHandle="crud.rowHandle"
        edit-title="修改"
        :add-template="crud.addTemplate"
        :add-rules="crud.addRules"
        :edit-template="crud.editTemplate"
        :edit-rules="crud.editRules"
        :form-options="crud.formOptions"
        :options="crud.options"
        @dialog-open="handleDialogOpen"
        @row-edit="handleRowEdit"
        @row-add="handleRowAdd"
        @row-remove="handleRowRemove"
        @dialog-cancel="handleDialogCancel">
      <el-button slot="header" style="margin-bottom: 5px" size="small" type="primary" @click="addRow">新增</el-button>
    </d2-crud>
    <crud-footer ref="footer" slot="footer"
                  :current="crud.page.pageCurrent"
                  :size="crud.page.pageSize"
                  :total="crud.page.pageTotal"
                  @change="handlePaginationChange"
    >
    </crud-footer>
  </d2-container>
</template>

<script>
import { crudOptions } from './crud'
import { d2CrudPlus } from 'd2-crud-plus'
import { AddObj, GetList, UpdateObj, DelObj } from './api'
export default {
  name: 'testPage',
  mixins: [d2CrudPlus.crud],
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      // 数据请求
      return GetList(query)
    },
    addRequest (row) {
      // 添加请求
      return AddObj(row)
    },
    updateRequest (row) {
      // 修改请求
      return UpdateObj(row)
    },
    delRequest (row) {
      // 删除请求
      return DelObj(row.id)
    },
  }
}
</script>

``` 
### 5. 示例数据
```
 [
    {date: '2016-05-02',status: '0', province: 'sz'},
    {date: '2016-05-04',status: '1',province: 'sh,sz'},
    {date: 2232433534511,status: '1', province: 'gz'},
    {date: '2016-05-03',status: '2',province: 'wh,gz'}
  ]
```
### 6. 效果    

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/list.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/add.png)

![](https://raw.githubusercontent.com/greper/d2-crud-plus/master/doc/image/edit.png)


## 文档
### 1. 配置说明

```javascript
export const crudOptions = {
  columns: [ //字段配置
    {
      title: '地区',  
      key: 'province', 
      type: 'select', //字段类型，根据类型可生成该字段的默认配置，下方那么多配置基本可以不用写
      sortable: true, //是否支持排序
      search: {
        disabled: false, //是否禁用该字段的查询，默认false
        component:{} //查询框组件配置，默认根据form配置生成 
      },
      form: {
        rules: [ // 表单校验规则
          { required: true, message: '请选择地区' }
        ],
        disabled:false, //是否禁用该字段的添加与修改
        addDisabled: false, //是否在添加时禁用该字段
        editDisabled: false, //是否在修改时禁用该字段
        component: { //添加和修改时form表单的组件
          name: 'dict-select', //组件名称
          props: { //组件的参数
            // d2-crud中默认组件的参数需要配置在component下，而自定义组件又要写在props下，经常会搞混
            // d2-crud-plus会将props复制一份到component下，所以参数全部配置在props下即可
            filterable: true, //可过滤选择项[不同组件参数不同]
            multiple: true, //支持多选[不同组件参数不同]
            clearable: true //可清除[不同组件参数不同]
          }
        }
      },
      valueBuilder (row) {
        // 某些组件传入的value值可能是一个复杂对象，而row中的单个属性的值不合适传入
        // 则需要在打开编辑对话框前将row里面多个字段组合成组件需要的value对象
        // 例如：国际手机号(mobileValue为此column的key)
        // row.mobileValue = { phoneNumber: row.phone, callingCode: row.code, countryCode: row.country }
      },
      valueResolve (row) { 
        // 组件中传回的值也需要分解成row中多个字段的值，用于提交给后台。
        // if (row.mobileValue != null) {
        //  row.phone = row.mobileValue.phoneNumber
        //  row.code = row.mobileValue.callingCode
        //  row.country = row.mobileValue.countryCode
        // } 
      },
      dict: { // 数据字典配置， 供select等组件通过value匹配label
        data: [ // 本地数据字典
          { value: 'sz', label: '深圳' },
           { value: 'gz', label: '广州' }, 
           { value: 'wh', label: '武汉' }, 
           { value: 'sh', label: '上海' }
        ],
        url:'/dict/get'// 若data为空，则通过http请求获取远程数据字典
      }
    }
  ],
  formOptions: { // 与d2-crud一致
    labelWidth: '100px',
    labelPosition: 'left',
    saveLoading: false,
    gutter: 20
  },
  searchOptions: {
    disabled: false //是否禁用搜索工具条
  },
  options: { // 与官d2-crud一致
    stripe: true,
    border: true,
    highlightCurrentRow: false
  },
  addTemplate: {}, //根据form配置自动生成
  editTemplate: {}, //根据form配置自动生成
  addRules: {}, //根据form配置自动生成
  editRules: {},//根据form配置自动生成
  list: [], //数据列表
  loading: false, //当前是否loading
  page: { //与d2-crud一致
    current: 1,
    size: 20,
    total: 1
  },
  rowHandle: { 
    //行操作栏，与d2-crud一致，默认配置有修改与删除
  }
}

```



<a href="https://github.com/d2-projects/d2-admin" target="_blank"><img src="https://raw.githubusercontent.com/FairyEver/d2-admin/master/doc/image/d2-admin@2x.png" width="200"></a>

