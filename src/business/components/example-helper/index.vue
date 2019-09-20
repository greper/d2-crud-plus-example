<template>
  <el-drawer
          :title="title"
          :visible.sync="drawer"
          direction="rtl"
          size="50%"
  >
    <div v-bind:style="{ padding:'20px','height': helperHeight ,'overflow-y': 'scroll',border: '1px solid #eee'}" >
      <slot></slot>
    </div>
  </el-drawer>
</template>
<script>
export default {
  name: 'example-helper',
  props: {
    drawer: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false,
      default: '帮助说明'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    helperHeight () {
      let height = document.documentElement.clientHeight - 100
      console.log('height:', height)
      return height + 'px'
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
