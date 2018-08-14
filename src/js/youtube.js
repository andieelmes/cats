export const loadYoutube = () => {
  var youtube = $(".js-youtube" );
	
	for (var i = 0; i < youtube.length; i++) {
		
    var source = "https://img.youtube.com/vi/"+ youtube.attr('data-embed') +"/hq720.jpg";

    var bg = $(youtube[i]).append( "<div class='webinar-bg' style='background-image:url("+source+")'></div>");
		
		
				youtube[i].addEventListener( "click", function() {

					var iframe = document.createElement( "iframe" );

							iframe.setAttribute( "frameborder", "0" );
              iframe.setAttribute( "allowfullscreen", "" );
              iframe.setAttribute( "width", "936" );
              iframe.setAttribute( "height", "465" );
							iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&amp;showinfo=0&amp;autoplay=1" );

							this.innerHTML = "";
							this.appendChild( iframe );
				} );	
	};

}

	