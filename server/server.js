Meteor.startup(function () {
  // code to run on server at startup
  if (Widgets.find().count() === 0) {
    var timestamp = (new Date()).getTime();
    Widgets.insert({
      id: 1,
      name: "widg",
      timestamp: timestamp
    });
    Widgets.insert({
      id: 0,
      name: "jason",
      timestamp: timestamp
    });
  }
  // Return widgets by id
  Meteor.publish("widgets", function (id) {
    return Widgets.find({id: parseInt(id)});
  })
})
