import { defineComponent, h } from 'vue';


export default defineComponent({
  methods: {
    increment () {
      this.count++
    }
  },
  props: {
    inheritedprops: undefined,
  },
  render () {
    const props = this.$props.inheritedprops || {};

    return h(props.tag, {
      ...props,
      class: ['vbtn', props.bordered && "vbtn-bordered" || 'vbtn-ghost', props.hoverchange && 'vbtn-withhover']
    }, this.$slots.default());
  },
});