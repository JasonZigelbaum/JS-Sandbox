Meteor.autosubscribe(function () {
  Meteor.subscribe('widgets', Session.get("id"));
})
Template.slider.slider = function() {
  return jason.get("name");
}
Template.slider.events({
  "click .change" : function() {
    jason.set({name: 'Macgruber'})
  }
})
Template.hello.greeting = function () {
  return "Welcome to my sandbox. I mess around with new javascript here.";
};
Template.hello.widget_name = function() {
  if (Widgets.findOne() === undefined)
    return "No widget with your id"
  else
    return Widgets.findOne().name;
}
Template.hello.events = {
  'click input' : function () {
    // template data, if any, is available in 'this'
    if (typeof console !== 'undefined') {
      Router.route_id(Math.floor(Math.random() * 2).toString());
    }
  }
};
Template.hello.id = function () {
  return Session.get("id");
}
Template.image_slider.rendered = function () {
  // Lets make a view for people.
  var BodyView = Backbone.View.extend({
    tagName: "body",
    render: function () {
      this.$el.css("backgroundColor", "red");
    }
  });

  var body = new BodyView();
  body.render();

	var slider = new BackboneSlider({
		container: "#slider-container",
    text: "checkout my slider!",
    images: ["/1.png",
             "/2.png",
             "/3.png",
             "/4.png",
             "/5.png",
             "/6.png",
             "/7.png",
            ]
	});

	slider.init();
}