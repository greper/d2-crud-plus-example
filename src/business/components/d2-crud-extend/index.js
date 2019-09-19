import EditDialog from './components/EditDialog'
const install = (Vue, options) => {
  Vue.component(EditDialog.name, EditDialog)
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const components = [
  EditDialog
]

export default { install, ...components }
