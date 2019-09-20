<template>
  <d2-container>
    <template slot="header">插槽式自定义组件
      <el-button @click="drawer = true" type="primary" style="margin-left: 16px;float:right">
        帮助
      </el-button>
      <el-drawer
              title="插槽式自定义组件帮助说明"
              :visible.sync="drawer"
              direction="rtl"
              width="50%"
              >
        <p>自定义插槽需要<a href="">d2-crud的修改版</a>才能支持</p>

      </el-drawer>
    </template>
    <crud-search ref="search" :options="crud.searchOptions" @submit="handleSearch" class="d2-mb-10" >
      <template slot="slotExampleSearchSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是写在slot上的"></el-input>
      </template>
    </crud-search>
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

      <template slot="slotExampleSlot" slot-scope="scope">
        <el-tag>{{scope.row['slotExample']}}</el-tag>
      </template>
      <template slot="slotExampleFormSlot" slot-scope="scope">
        <el-input v-model="scope.form['slotExample']" placeholder="这是通过slot自定义的"></el-input>
      </template>
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
import { AddObj, GetList, UpdateObj, DelObj } from './api'
import { crudOptions } from './crud'
import d2CrudPlus from '@d2-crud-plus'
export default {
  name: 'selectPage',
  mixins: [d2CrudPlus.crud],
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    getCrudOptions () {
      return crudOptions
    },
    pageRequest (query) {
      return GetList(query)
    },
    addRequest (row) {
      return AddObj(row)
    },
    updateRequest (row) {
      return UpdateObj(row)
    },
    delRequest (row) {
      return DelObj(row.id)
    }
  }
}
</script>
