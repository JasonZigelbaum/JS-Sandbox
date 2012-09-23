var AppRouter = Backbone.Router.extend({
  routes: {
    ":id": "set_id"
  },
  set_id: function(id) {
    Session.set("id", id);
  },
  route_id: function (id) {
    this.navigate(id, true);
  }
})

Router = new AppRouter;

Meteor.startup(function () {
  Backbone.history.start({pushState: true})
})