var rotation = 0;
var suma = 0;
var vueltas = 0;
var estado = "stop";
var pararen;

var snds = {
	tap: new Audio('snds/tap.mp3'),
	win: new Audio('snds/win.mp3'),
	spin: new Audio('snds/spin.mp3'),
	
	play: function( snd ){
			this[snd].play();
	}
	
};

var d = new Date();
var n = d.getDate();

var def = [
	{ id: 'smart', position: 50, cantidad: 3 },
	{ id: 'poker', position: 250, cantidad: 25 },
	{ id: 'avisosilimitados', position: 115, cantidad: 9999 },
	{ id: 'avisosdestacados', position: 185, cantidad: 9999 },
	{ id: 'alquileres', position: 325, cantidad: 9999 }
];

console.log( 'El dia guardado es '+ localStorage['date'] +', el dia de hoy es '+n+'.' );

if ( localStorage['date'] != n ){
	
	console.log( 'Cargando datos por dafault:' );
	
	localStorage['date'] = n;

	localStorage['premios']=JSON.stringify(def);
		
} else {
	console.log( 'Se cargaron los datos guardados del dia de hoy:' );
}

var premios = JSON.parse(localStorage['premios']);

console.log (  premios );

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

	setInterval( function(){
		
		 if(rotation > 360){
			 rotation = 0;
			 vueltas++;
			 
			 snds.play('tap');
			 
		 }
		 

		if( estado == "stop" ){

			suma -= suma / 100;
			
			if( suma < 5 && rotation/2 < pararen/2 ){
				
				rotation += (pararen - rotation) * 0.025;
				
				if(suma < 1 && $('img.luces').attr('src') != 'imgs/lucesB.gif' ){
					$('img.luces').attr('src', 'imgs/lucesB.gif');
					
					snds.play('win');
					
				}
				
				
				
				
				
			} else {

				rotation += suma;
			}
			
			
			 
				
		} else {
			
			 if(suma < 25) { suma += suma / 100; }
			 rotation += suma;
			
				
		}
		
		 $('.roulette-arrow').rotate( Math.round(rotation) );
			 
		//console.log("vueltas", vueltas, "rotation", Math.round(rotation), "estado", estado, "parar en", pararen, "suma", suma);
			 
	}, 30);

	
$('.roulette-arrow').click(function() {
	
	if (estado == "stop" && suma < 1 ){
		
		snds.play('spin');

		vueltas = 0;
		estado = "play";
		suma = 5;
		
		$('img.luces').attr('src', 'imgs/lucesA.gif');
		
		
		var pos = getRandomInt( 0, premios.length );
		

		premios[ pos ].cantidad--;
			

		pararen = premios[ pos ].position + getRandomInt(-15, 15 );
		
		console.log("para en: ", premios[ pos ].id );
				
		
		if ( premios[ pos ].cantidad <= 1 ){
			premios.splice( pos , 1);
		}
		
		localStorage['premios']=JSON.stringify(premios);
		console.log(premios);
		
	} else if ( suma > 24 ) {
		estado = "stop";
	}


	
});





	
$('#config').click(function() {
	
	var resp = prompt("COMMAND");
	
	if ( resp == "reset" ){
		
		reiniciar();
		
	}
	
	else if ( resp == "premios" ){
		
		alert( JSON.stringify( premios ) );
		
	}
	
	else if ( resp == "fs" ){
		
		var elem = document.documentElement;
		  if (elem.requestFullscreen) {
			elem.requestFullscreen();
		  } else if (elem.mozRequestFullScreen) { /* Firefox */
			elem.mozRequestFullScreen();
		  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		  } else if (elem.msRequestFullscreen) { /* IE/Edge */
			elem.msRequestFullscreen();
		  }
		
	}
	
});




function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


function reiniciar() {
	
	localStorage['premios']=JSON.stringify(def);
	premios = JSON.parse(localStorage['premios']);
	
	alert("RESET OK");
	
}