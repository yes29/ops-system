export default {
  name: 'RenderItem',
  functional: true,
  props: {
    item: Object,
    params: Object,
    render: Function,
  },
  // 可以render输入，以增加扩展和灵活度
  render: (h: any, ctx: any) => {
    const params = {
        item: ctx.props.item,
        params: ctx.props.params,
    };
    return ctx.props.render(h, params);
  },
};
