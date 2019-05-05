export default function({ store, error }) {
  if (!store.state.user.authUser) {
    error({
      message: "You are not connected",
      statusCode: 403
    });
  }
}
