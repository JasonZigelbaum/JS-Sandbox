var BackboneSlider = function (options) {
	var $container = $(options.container) || $("#container");
  var $slider = $("<div id='jz-slider'></div>");
	var text = options.text || "jason rules";
  var images = options.images || [];
  var imageWidth = options.imageWidth || 250;
  var imageHeight = options.imageHeight || 250;
  var current = options.startIndex || 0;

	this.init = function() {
    var sliderView = document.createElement('div');
    sliderView.id = "slider-view";

    var loader = document.createElement('img');
    loader.className = "loader";
    loader.src = "/2.gif";

    var image = document.createElement('img');
    image.className = 'image';
    
    $(sliderView).append(loader).append(image);

    var left = document.createElement('button');
    var right = document.createElement('button');
    left.className = 'prev';
    left.innerHTML = 'prev'
    right.className = 'next';
    right.innerHTML = 'next';
    
    $slider.append(left).append(right).append(sliderView);
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
      el: $('#jz-slider'),
      model: sliderModel,
      events: {
        "click .next" : function () { 
          this.model.set({data: images[++current % images.length]});
        },
        "click .prev" : function () {
          if (current != 0)
            current--;
          else
            current = images.length - 1;
          this.model.set({data: images[current % images.length]});
        }
      },
      initialize: function () { this.render() },
      render: function () {
        console.log(Helpers.getTime());
        var $view = $(this.$el.find('#slider-view .image'));
        var data = this.model.get("data");
        $view.load(function () {
          $(this).animate({opacity: 1}, 100);
        });
        $view.animate({opacity: .0}, 100, function () {
          $(this).attr("src", data);
        });
        return this;
      }
    });
    var sliderView = new SliderView();
    // Connect the view to the model
    sliderModel.set({view: sliderView});

    // Test it out
    sliderModel.set({data: images[current]});
    return this;
	}
	
	return this;
}