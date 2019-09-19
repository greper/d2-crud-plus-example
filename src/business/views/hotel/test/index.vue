<template>
  <d2-container>
    <template slot="header">房间管理</template>
    <crud-search ref="search" :options="crud.columns" @submit="handleSearch" class="d2-mb-10" ></crud-search>
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
import d2CrudPlus from '@d2-crud-plus'
export default {
  name: 'roomList',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
    }
  },
  created () {
    this.initColumns()
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    fetchList (query) {
      return new Promise(resolve => {
        resolve({
          code: 1,
          msg: '',
          data: {
            current: 1,
            total: 4,
            size: 10,
            records: [
              {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
              },
              {
                date: 2232433534511,
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
              },
              {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
              }
            ]
          }
        })
      })
    }
  }
}
</script>
