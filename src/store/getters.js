const getters = {
  plateform: state => state.app.plateform,
  info: state => state.app.info,
  userId: state => state.user.id,
  nickName: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  email: state => state.user.email,
  mobile: state => state.user.mobile,
  isLogin: state => state.user.isLogin,
  admin_routes: state => state.permission.addRoutes,
}

export default getters