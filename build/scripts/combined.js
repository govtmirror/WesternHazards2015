function addCommas(e){e+="";for(var i=e.split("."),a=i[0],t=i.length>1?"."+i[1]:"",n=/(\d+)(\d{3})/;n.test(a);)a=a.replace(n,"$1,$2");return a+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,i){return 0==i?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["esri/geometry/Extent","esri/layers/WMSLayerInfo","esri/layers/FeatureLayer","dojo/domReady!"],function(e,i,a){allLayers=[{groupHeading:"Hazards",showGroupHeading:!0,includeInLayerList:!0,layers:{Floods:{url:"http://igems.doi.gov/ArcGIS/rest/services/igems_haz/MapServer",visibleLayers:[0],options:{id:"floods",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},Severe:{url:"http://igems.doi.gov/ArcGIS/rest/services/igems_haz/MapServer",visibleLayers:[12],options:{id:"severe",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},Warnings:{url:"http://igems.doi.gov/ArcGIS/rest/services/igems_haz/MapServer",visibleLayers:[13],options:{id:"warnings",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},Watches:{url:"http://igems.doi.gov/ArcGIS/rest/services/igems_haz/MapServer",visibleLayers:[14],options:{id:"watches",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}},Advisories:{url:"http://igems.doi.gov/ArcGIS/rest/services/igems_haz/MapServer",visibleLayers:[15],options:{id:"advisories",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,dragInfoWindows=!0,legendLayers=[];require(["esri/arcgis/utils","esri/map","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/layers/ArcGISTiledMapServiceLayer","esri/dijit/Geocoder","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Multipoint","esri/symbols/PictureMarkerSymbol","esri/geometry/webMercatorUtils","dojo/dnd/Moveable","dojo/query","dojo/dom","dojo/dom-class","dojo/on","dojo/domReady!"],function(e,i,a,t,n,o,s,l,r,d,c,p,g,m,u,y,h){function f(){1===u.byId("chkExtent").checked?C.activeGeocoder.searchExtent=map.extent:C.activeGeocoder.searchExtent=null}function v(){f();var e=C.find();e.then(function(e){L(e)}),$("#geosearchModal").modal("hide")}function b(e){I();var i=e.graphic?e.graphic:e.result.feature;i.setSymbol(T),x(e.result,i.symbol),$("#geosearchModal").modal("hide")}function L(e){if(e=e.results,e.length>0){I();for(var i=T,a=0;a<e.length;a++)x(e[a],i);S(e)}}function w(e){var i=e.indexOf(",");return i>0&&(e=e.substring(0,i)),e}function x(e,i){var a,t,n,o,s={};n=e.feature.geometry,s.address=e.name,s.score=e.feature.attributes.Score,a={address:w(s.address),score:s.score,lat:n.getLatitude().toFixed(2),lon:n.getLongitude().toFixed(2)},t=new l({title:"{address}",description:"Latitude: {lat}<br/>Longitude: {lon}"}),o=new r(n,i,a,t),map.graphics.add(o)}function S(e){for(var i=new d(map.spatialReference),a=0;a<e.length;a++)i.addPoint(e[a].feature.geometry);map.setExtent(i.getExtent().expand(2))}function I(){map.infoWindow.hide(),map.graphics.clear()}function z(e,i,a,t,n){return new c({angle:0,xoffset:i,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:t,height:n})}map=i("mapDiv",{basemap:"topo",center:[-95.6,38.6],zoom:5});var H=new a({map:map},"homeButton");H.startup();var k=new n({map:map},"locateButton");k.startup(),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),h(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var i=p.webMercatorToGeographic(map.extent.getCenter());if($("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3)),1==dragInfoWindows){var a=m(".title",map.infoWindow.domNode)[0],t=new g(map.infoWindow.domNode,{handle:a});h(t,"FirstMove",function(){var e=m(".outerPointer",map.infoWindow.domNode)[0];y.add(e,"hidden");var e=m(".pointer",map.infoWindow.domNode)[0];y.add(e,"hidden")}.bind(this))}}),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),h(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),h(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var i=p.webMercatorToGeographic(e.mapPoint);$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}}),h(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=p.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var O=new o("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");h(u.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(O)}),h(u.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(O)}),h(u.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(O)}),h(u.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(O)}),h(u.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(O)}),h(u.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(O)}),h(u.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(O)}),h(u.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(O)}),h(u.byId("btnNatlMap"),"click",function(){map.addLayer(O)}),h(map,"click",function(e){var i=new r,a=i,t=new esri.InfoTemplate("test popup","attributes appear here");a.setInfoTemplate(t),map.infoWindow.setFeatures([a]),map.infoWindow.show(e.mapPoint),map.infoWindow.show()});var C=new s({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");C.startup(),C.on("select",b),C.on("findResults",L),C.on("clear",I),h(C.inputNode,"keydown",function(e){13==e.keyCode&&f()});var T=z("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),h(u.byId("btnGeosearch"),"click",v),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new t({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")})}),require(["esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,i,a,t,n,o,s,l,r,d,c,p,g,m,u,y,h,f){function v(e,i,a,t,n,o,s){if(map.addLayer(a),b.push([n,camelize(t),a]),n){if(!$("#"+camelize(n)).length){var l=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");l.click(function(e){l.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(b,function(e,i){var a=map.getLayer(i[2].id);if(i[0]==n)if($("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&l.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var a=map.getLayer(i[2].id);a.setVisibility(!0)}else l.find("i.glyphspan").hasClass("fa-square-o")&&(console.log("removing layer: ",i[1]),map.removeLayer(i[2]))})});var r=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(r)}if(a.visible)var d=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");else var d=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");$("#"+camelize(n)).append(d),d.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var i=$(this)[0].id;$.each(b,function(e,a){if(a[0]==n)if(a[1]==i&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var t=map.getLayer(a[2].id);t.setVisibility(!0)}else a[1]==i&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o")?console.log("groud heading not checked"):(console.log("removing layer: ",a[1]),map.removeLayer(a[2]),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o"))})}})}else{if(a.visible&&void 0!==s.hasOpacitySlider&&1==s.hasOpacitySlider)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(a.visible||void 0===s.hasOpacitySlider||1!=s.hasOpacitySlider)if(a.visible)var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+"</button></span></div>");else var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+"</button> </div>");else var d=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');d.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),e.preventDefault(),e.stopPropagation(),$("#"+camelize(t)).toggle(),a.visible?a.setVisibility(!1):a.setVisibility(!0)})}if(i){var c=camelize(e);if(!$("#"+c).length){var p=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");$("#toggle").append(p)}n?($("#"+c).append(l),$("#"+c).append(r)):($("#"+c).append(d),$("#opacity"+camelize(t)).length>0&&$("#opacity"+camelize(t)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(o.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var i=$("#slider")[0].value/100;console.log("o: "+i),$("#opacityValue").html("Opacity: "+i),map.getLayer(o.id).setOpacity(i)})}))}else $("#toggle").append(d)}var b=[];$.each(allLayers,function(e,i){console.log("processing: ",i.groupHeading),$.each(i.layers,function(e,a){var t="";if(a.wimOptions.exclusiveGroupName&&(t=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var n=new l(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),v(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var n=new r(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),v(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var n=new s(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),a.visibleLayers&&n.setVisibleLayers(a.visibleLayers),v(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}})})})}),$(document).ready(function(){});