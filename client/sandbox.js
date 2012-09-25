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
Template.twitter_feed.rendered = function() {
  
  var TwitterModel = Backbone.Model.extend({
    initialize: function() {
      this.bind("change:tweets", this.tweetsChanged)
    },
    tweetsChanged: function() {
      // If we have setup a view, render it.
      if (this.get("view")) {
        this.get("view").render();
      }
      console.log("my data has changed from " + this.previous("tweets") + " to " + this.get("tweets"));
    }
  });
  
  var twitterModel = new TwitterModel({
    tweets: []
  });
  
  var TwitterView = Backbone.View.extend({
    el: $("#feed"),
    model: twitterModel,
    events: {
      "click" : function() {
        var tweets = this.model.get("tweets");
        tweets.push("tweet");
        console.log(this.model.get("tweets"));
        this.model.set({tweets: tweets});
      }
    },
    render: function () {
      console.log("called render");
    }
  });
  
  var twitterView = new TwitterView();
  twitterModel.view = twitterView;
  
  twitterView.render();
};