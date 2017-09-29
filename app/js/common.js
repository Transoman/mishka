var nav = document.querySelector('.nav');
var navBtn = document.querySelector('.nav__toggle');

navBtn.addEventListener('click', function(e) {
	if(nav.classList.contains('nav--closed')) {
		nav.classList.remove('nav--closed');
		nav.classList.add('nav--opened');
	}
	else {
		nav.classList.remove('nav--opened');
		nav.classList.add('nav--closed');
	}
});


var reviewRadio = document.querySelectorAll('.review__input');
var reviewBtnLeft = document.querySelector('.review__button--left');
var reviewBtnRight = document.querySelector('.review__button--right');
var reviewCount = reviewRadio.length;

if(reviewBtnLeft) {
	reviewBtnLeft.addEventListener('click', function(e) {
		for(i = 0; i < reviewCount; i++) {
			if(reviewRadio[i].checked) {
				if(i - 1 == 0) {
					reviewRadio[i-1].checked = true;
					reviewBtnLeft.disabled = true;
					break;
				}
				else {
					reviewRadio[i].checked = false;
					reviewRadio[i - 1].checked = true;
					reviewBtnRight.disabled = false;
					break;
				}
			}
		}
	});
}

if(reviewBtnRight) {
	reviewBtnRight.addEventListener('click', function(e) {
		for(i = 0; i < reviewCount; i++) {
			if(reviewRadio[i].checked) {
				if(i + 1 == reviewCount - 1) {
					reviewRadio[i + 1].checked = true;
					reviewBtnRight.disabled = true;
					break;
				}
				else {
					reviewRadio[i].checked = false;
					reviewRadio[i + 1].checked = true;
					reviewBtnLeft.disabled = false;
					break;
				}
			}
		}
	});
}

// Svg-sprite LocalStorage
;( function( window, document )
{
	'use strict';

	var file     = 'img/symbols.html',
			revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
			return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
			request,
			data,
			insertIT = function()
			{
					document.body.insertAdjacentHTML( 'afterbegin', data );
			},
			insert = function()
			{
					if( document.body ) insertIT();
					else document.addEventListener( 'DOMContentLoaded', insertIT );
			};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
				insert();
				return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
			{
				if( request.status >= 200 && request.status < 400 )
					{
						data = request.responseText;
						insert();
						if( isLocalStorage )
						{
							localStorage.setItem( 'inlineSVGdata',  data );
							localStorage.setItem( 'inlineSVGrev',   revision );
						}
				}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );


// Poster to video
var poster = document.querySelector('.process__video');
var sizeWindow = window.innerWidth;

if(poster) {
	setPoster(sizeWindow);

	window.addEventListener('resize', function() {
		sizeWindow = window.innerWidth;
		setPoster(sizeWindow);
	});
}

function setPoster (sizeWindow) {
	if ( sizeWindow <= 767 ) {
		poster.setAttribute('poster', 'img/video-mobile.jpg');
	}
	else if ( sizeWindow >= 768 && sizeWindow <= 1049) {
		poster.setAttribute('poster', 'img/video-tablet.jpg');
	}
	else if ( sizeWindow >= 1050) {
		poster.setAttribute('poster', 'img/video-desktop.jpg');
	}
}


// Maps
function initMap() {
	var myLatLng = {lat: 59.9387942, lng: 30.3230833};

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: myLatLng,
		scrollwheel: false
	});

	var isIE11 = !!(navigator.userAgent.match(/Trident/) && navigator.userAgent.match(/rv[ :]11/)); // Detect whether it is IE11
	var icon = '../img/map-marker.png';

	// if(isIE11) {
	// 	icon = '../img/map-marker.png';
	// }

	map.addListener('click', function(){
		map.setOptions({scrollwheel: true});
	});
	map.addListener('mouseout', function(){
		map.setOptions({scrollwheel: false});
	});

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: 'Mishka',
		icon: {
			url: icon
			// scaledSize: new google.maps.Size(67, 100)
		}
	});
}


// Mask phone
var input = document.getElementById('phone');
var newValue;
var inputValue;

if(input) {
	input.addEventListener('keyup', function(e) {
		inputValue = input.value;

		if(e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105) {
		}
		else {
			newValue = inputValue.replace(/[a-zA-zа-яА-Я]/g, "");
			input.value = newValue;
		}

	});
}