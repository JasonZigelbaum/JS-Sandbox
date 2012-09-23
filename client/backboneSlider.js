var BackboneSlider = function (options) {
	var $container = $(options.container) || $("#container");
  var $slider = $("<div id='jz-slider'></div>");
	var text = options.text || "jason rules";
  var images = options.images || [];
  var imageWidth = options.imageWidth || 250;
  var imageHeight = options.imageHeight || 250;
  var current = options.startIndex || 0;
  
	this.init = function() {
    var img = document.createElement('img');
    $slider.append($("<img id='slider-view'></img>"))
    $container.append($slider);

    // Create our data model
    var SliderModel = Backbone.Model.extend({
      initialize: function () {
        this.bind("change:data", this.dataChanged);
      },
      dataChanged: function() {
        // If we have setup a view, render it.
        if (this.get("view")) {
          this.get("view").render();
        }
        console.log("my data has changed from " + this.previous("data") + " to " + this.get("data"));
      }
    });
    var sliderModel = new SliderModel({
      data: images[current]
    });

    // Create our view.
    var SliderView = Backbone.View.extend({
      el: $('#slider-view'),
      model: sliderModel,
      events: {
        "click" : function () { 
          this.model.set({data: images[++current % images.length]});
        }
      },
      render: function () {
        this.$el.css("backgroundColor", "orange");
        this.$el.hide();
        this.$el.load(function () {
          $(this).fadeIn('100');
        });
        this.el.src = this.model.get("data");
        return this;
      }
    });
    var sliderView = new SliderView();
    // Connect the view to the model
    sliderModel.set({view: sliderView});

    // Test it out
    sliderModel.set({data: images[1]});

    return this;
	}
	
	return this;
}