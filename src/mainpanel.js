// KPR Script file
var stride = 16;
var data = {
			location: "Tokyo",
			attribution: "openweathermap.org"
};
var state = [];

var Startbehavior = function(){
}
Startbehavior.prototype = Object.create(Object.prototype, {
	onTouchBegan: {
		value: function(start) {
			var uri = "http://api.openweathermap.org/data/2.5/weather?" +
					serializeQuery({
						q: data.location,
						mode: "xml",
						units: "imperial"
					});
			start.invoke( new Message( uri ), Message.DOM ); 
		}
	},
	onComplete: {
		value: function(start, message, document){
			var tem1, tem10;
			var weather=0;
			if ( document ) {
				var items, node, value;
				items = document.getElementsByTagName( "weather" );
				if ( items.length > 0 ) {
					node = items.item( 0 );
					value = node.getAttribute( "number" );
					if(value == 800 & value == 801) weather = 1;//fine;
					else if(value == 802 & value == 803 && value == 804) weather = 2;//cloud;
					else weather = 0;//rain;
				}
				items = document.getElementsByTagName( "temperature" );
				if ( items.length > 0 ) {
					node = items.item( 0 );
					value = node.getAttribute( "value" );
					if ( value ){
						tem10 = Math.floor( value );
						//trace(tem10);
						tem1 = tem10%10;
						tem10 = Math.floor(tem10/10);
						//trace(tem1);
						//trace(tem10);
					}
				}
				var wmark;
				switch(weather){
					case 1: 
			 			wmark= Files.readText(mergeURI(application.url, "./weather/fine.txt"));
			 			break;
			 		case 2:
			 			wmark = Files.readText(mergeURI(application.url, "./weather/cloud.txt"));
			 			break;
			 		case 0:
			 			wmark = Files.readText(mergeURI(application.url, "./weather/rain.txt"));
			 			break;
				}
				
				for(var y=0;y<10;y++){
					for(var x=0;x<stride;x++){
						var line = wmark.slice(x+y*stride,x+y*stride+1);
						if(line>0) state[x+y*stride] = true;
						else state[x+y*stride] = false;
					}
				}
				
				var no1, no10;
				switch(tem1){
					case 1:
						no1 = Files.readText(mergeURI(application.url, "./number/one.txt"));
						break;
					case 2:
						no1 = Files.readText(mergeURI(application.url, "./number/two.txt"));
						break;
					case 3:
						no1 = Files.readText(mergeURI(application.url, "./number/three.txt"));
						break;
					case 4:
						no1 = Files.readText(mergeURI(application.url, "./number/four.txt"));
						break;
					case 5:
						no1 = Files.readText(mergeURI(application.url, "./number/five.txt"));
						break;
					case 6:
						no1 = Files.readText(mergeURI(application.url, "./number/six.txt"));
						break;
					case 7:
						no1 = Files.readText(mergeURI(application.url, "./number/seven.txt"));
						break;
					case 8:
						no1 = Files.readText(mergeURI(application.url, "./number/eight.txt"));
						break;
					case 9:
						no1 = Files.readText(mergeURI(application.url, "./number/nine.txt"));
						break;
					case 0:
						no1 = Files.readText(mergeURI(application.url, "./number/zero.txt"));
						break;
				}
				switch(tem10){
					case 1:
						no10 = Files.readText(mergeURI(application.url, "./number/one.txt"));
						break;
					case 2:
						no10 = Files.readText(mergeURI(application.url, "./number/two.txt"));
						break;
					case 3:
						no10= Files.readText(mergeURI(application.url, "./number/three.txt"));
						break;
					case 4:
						no10 = Files.readText(mergeURI(application.url, "./number/four.txt"));
						break;
					case 5:
						no10 = Files.readText(mergeURI(application.url, "./number/five.txt"));
						break;
					case 6:
						no10 = Files.readText(mergeURI(application.url, "./number/six.txt"));
						break;
					case 7:
						no10 = Files.readText(mergeURI(application.url, "./number/seven.txt"));
						break;
					case 8:
						no10 = Files.readText(mergeURI(application.url, "./number/eight.txt"));
						break;
					case 9:
						no10 = Files.readText(mergeURI(application.url, "./number/nine.txt"));
						break;
					case 0:
						no10 = Files.readText(mergeURI(application.url, "./number/zero.txt"));
						break;
				}
				
				for(var y=0;y<5;y++){
					for(var x=0;x<3;x++){
						var line = no10.slice(x+y*3,x+y*3+1);
						if(line>0) state[(x+3)+(y+11)*stride] = true;
						else state[(x+3)+(y+11)*stride] = false;
						
						var line1 = no1.slice(x+y*3,x+y*3+1);
						if(line1>0) state[(x+7)+(y+11)*stride] = true;
						else state[(x+7)+(y+11)*stride] = false;
					}
				}
				
				var dot = Files.readText(mergeURI(application.url, "./weather/do.txt"));
				for(var y=0;y<3;y++){
					for(var x=0;x<3;x++){
						var line = dot.slice(x+y*3,x+y*3+1);
						if(line>0) state[(x+11)+(y+11)*stride] = true;
						else state[(x+11)+(y+11)*stride] = false;
					}
				}
			}
		}
	},
});

var Panel = function () {
}
Panel.prototype = Object.create(Object.prototype, {
	onTouchBegan: {
		value: function(p) {		
			if(state[p.variant]){
				state[p.variant] = false;
			}else{
				state[p.variant] = true;
			}
		}
	},
	onTimeChanged: {
		value: function(p){
			if(state[p.variant]){
				p.skin = new Skin("red");
			}else{
				p.skin = new Skin("white");
			}
		}
	},
});

// KPR Script file
var build = function(container) {
	container.skin = new Skin("blue");
    for(var i=0;i<stride*stride;i++) state[i] = false; 

	var l=10;	
	for(var i=0;i<stride;i++){
		for(var j=0;j<stride;j++){
			var p = new Content({left:i*l + 80,top:j*l + 20, width:l,height:l },new Skin("white"));
			p.behavior = new Panel();
			p.active = true;
			p.variant = i + j*16;
			container.add(p);
			p.start();
		}
	}
	
	var start = new Container({left:160,top:180, width:80,height:30 },new Skin("gray"));
	start.behavior = new Startbehavior();
	start.active = true;
	var te = new Style("bold 20px", "white");
	var label = new Label(null, null, te, "start");
	start.add(label);
	container.add(start);
}
application.behavior = {
	onAdapt: function(application) {
		application.empty();
		build(application);
	},
	onLaunch: function(application) {
		build(application);
	},
}
