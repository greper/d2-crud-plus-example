<template>
  <el-dialog
      v-if="isDialogShow"
      :title="formMode === 'edit' ? editTitle : addTitle"
      :visible.sync="isDialogShow"
      :before-close="handleDialogCancel"
      v-bind="formOptions"
  >
    <el-form
        ref="form"
        :model="formData"
        :rules="handleFormRulesMode()"
        v-bind="formOptions"
    >
      <el-row v-bind="formOptions">
        <template v-for="(value, key) in formData" >
          <el-col
              v-if="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.show, true) : true"
              :span="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.span, 24) : 24"
              :offset="handleFormTemplateMode(key).component ? handleAttribute(handleFormTemplateMode(key).component.offset, 0) : 0"
              v-bind:key = "key"
          >
            <el-form-item
                :label="handleFormTemplateMode(key).title"
                :prop="key"
            >
              <el-input
                  v-if="(!handleFormTemplateMode(key).component) ||((!handleFormTemplateMode(key).component.name) && (!handleFormTemplateMode(key).component.render)) || handleFormTemplateMode(key).component.name === 'el-input'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-input>
              <el-input-number
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-input-number'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-input-number>
              <el-radio-group
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-radio'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
                <template v-if="handleFormTemplateMode(key).component.buttonMode">
                  <el-radio-button
                      v-for="option in handleFormTemplateMode(key).component.options"
                      :key="option.value"
                      :label="option.value"
                  >
                    {{option.label}}
                  </el-radio-button>
                </template>
                <template v-else>
                  <el-radio
                      v-for="option in handleFormTemplateMode(key).component.options"
                      :key="option.value"
                      :label="option.value"
                  >
                    {{option.label}}
                  </el-radio>
                </template>
              </el-radio-group>
              <el-checkbox-group
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-checkbox'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
                <template v-if="handleFormTemplateMode(key).component.buttonMode">
                  <el-checkbox-button
                      v-for="option in handleFormTemplateMode(key).component.options"
                      :key="option.value"
                      :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox-button>
                </template>
                <template v-else>
                  <el-checkbox
                      v-for="option in handleFormTemplateMode(key).component.options"
                      :key="option.value"
                      :label="option.value"
                  >
                    {{option.label}}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
              <el-select
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-select'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
                <el-option
                    v-for="option in handleFormTemplateMode(key).component.options"
                    :key="option.value"
                    v-bind="option"
                >
                </el-option>
              </el-select>
              <el-cascader
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-cascader'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-cascader>
              <el-switch
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-switch'"
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-switch>
              <el-slider
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-slider'"
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-slider>
              <el-time-select
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-time-select'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-time-select>
              <el-time-picker
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-time-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-time-picker>
              <el-date-picker
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-date-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-date-picker>
              <el-rate
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-rate'"
                  v-model="formData[key]"
                  v-bind="handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-rate>
              <el-color-picker
                  v-else-if="handleFormTemplateMode(key).component.name === 'el-color-picker'"
                  v-model="formData[key]"
                  v-bind="$d2CrudSize ? Object.assign({ size: $d2CrudSize}, handleFormTemplateMode(key).component) : handleFormTemplateMode(key).component"
                  @change="$emit('form-data-change', {key: key, value: value})"
              >
              </el-color-picker>
              <render-custom-component
                  v-else-if="handleFormTemplateMode(key).component.name"
                  v-model="formData[key]"
                  :component-name="handleFormTemplateMode(key).component.name"
                  :props="handleFormTemplateMode(key).component.props ? handleFormTemplateMode(key).component.props : null"
              >
              </render-custom-component>
              <render-component
                  v-else-if="handleFormTemplateMode(key).component.render"
                  :render-function="handleFormTemplateMode(key).component.render"
                  :scope="formData[key]"
              >
              </render-component>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button
          :size="formOptions ? handleAttribute(formOptions.saveButtonSize, null) : null"
          :type="formOptions ? handleAttribute(formOptions.saveButtonType, null) : null"
          :icon="formOptions ? handleAttribute(formOptions.saveButtonIcon, null) : null"
          :loading="formOptions ? handleAttribute(formOptions.saveLoading, false) : false"
          @click="handleDialogSave"
      >
        {{formOptions ? handleAttribute(formOptions.saveButtonText, '确定') : '确定'}}
      </el-button>
    </div>
  </el-dialog>

</template>
<script>
import d2Crud from '@d2-crud'
import _get from 'lodash.get'
import _set from 'lodash.set'
export default {
  name: 'edit-dialog',
  mixins: [
    d2Crud.dialog,
    d2Crud.add, d2Crud.edit,
    d2Crud.utils,
    d2Crud.remove,
    d2Crud.handleRow
  ],
  methods: {
    _get,
    _set,
    handleUpdateRow (index, row) {
    },
    /**
     * @description 新增行数据
     * @param {Object} row 新增的表格行数据
     */
    handleAddRow (row) {
    },
    /**
     * @description 删除行
     * @param {Object} index 被删除行索引
     */
    handleRemoveRow (index) {
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
