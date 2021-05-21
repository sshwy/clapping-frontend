import { defineComponent, h } from 'vue';

export default defineComponent({
  props: {
    inheritedprops: Object,
  },
  render () {
    const props = this.$props.inheritedprops || {};

    // console.log(this.$props, this.$attrs);

    return h(props.tag, {
      ...props,
      class: props.styled && [
        'vbtn',
        props.bordered && "vbtn-bordered" || 'vbtn-ghost',
        props.hoverchange && 'vbtn-withhover'
      ],
    }, this.$slots.default());
  },
});