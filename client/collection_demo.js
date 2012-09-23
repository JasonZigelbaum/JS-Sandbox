var Dispatcher = _.clone(Backbone.Events);

var object = {};

Dispatcher.on(
  "object:start",
	function() { 
		this.status = "started";
		console.log(this);
	},
  object
)

Dispatcher.trigger("object:start");

var Person = Backbone.Model.extend({
	name: "jason",
	age: 23,
	gender: "male",
	initialize: function () { 
		this.bind("change:name", this.nameChanged);
	},
	nameChanged: function () {
		console.log(this.cid);
		console.log("I see that " + this.previous("name") + " changed his name to " + this.get("name"));
		console.log(this.changedAttributes());
	}
});

var People = Backbone.Collection.extend({
	initialize: function () {
		this.bind("add", this.personAdded);
	},
	personAdded: function (person) {
		console.log("Hello " + person.name + " welcome to America!");
	},
	type: "Germans"
})

var americans = new People({type: "Americans"})

var jason = new Person({name: "Jason", age:23});
var sean = new Person({name: "Sean", age: 23});

americans.add(jason);

// jason.set({name: "jaosnjaason"});
// sean.set({name: "jason"});
// sean.set({age: 24});
