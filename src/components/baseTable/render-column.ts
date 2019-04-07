export default {
  name: 'RenderColumn',
  functional: true,
  props: {
    row: Object,
    reqDelete: Function,
    handleEdit: Function,
    render: Function,
  },
  render: (h: any, ctx: any) => {
    const data = {
      row: ctx.props.row,
      reqDelete: ctx.props.reqDelete,
      handleEdit: ctx.props.handleEdit,
    };
    return ctx.props.render(h, data);
  },
};
