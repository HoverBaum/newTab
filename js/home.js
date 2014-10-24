hourInterval = null;	//Intervall for hourly tasks.
images = null;			//Array of currently used images.

//-------------------------------------------------------------
/*
    Initialisations
*/
//-------------------------------------------------------------

$(document).ready(function() {
	images = general;
    updateGreeting();
    hourInterval = setInterval(updateGreeting, 60000)
    registerHooks();
});

function registerHooks() {
    $("#search-js").keypress(search);
}

//-----------------------------------------------------------
/*
    Greeting
    Everything needed to set the Greeting according to hour.
*/
//-----------------------------------------------------------

function updateGreeting() {
    var date = new Date;
    var h = date.getHours();
    var greet = generateGreeting(h);
    $("#greeting-js").text(greet);
	updateBackground();
}

function generateGreeting(h) {
    if(h < 6) return "Hallo";
    if(h < 11) return "Guten Morgen";
    if(h < 14) return "Hallo";
    if(h < 18) return "Guten Nachmittag";
    if(h < 19) return "Hallo";
    if(h < 23) return "Guten Abend";
}

//--------------------------------------------------------------
/*
    Searching
*/  
//-----------------------------------------------------------------
    
function search(e) {
    if(e.charCode != 13) return;
    var term = $("#search-js").val();
    var form = document.getElementById("searchForm");
    if(term.indexOf("!") === 0){
        if(term.indexOf("!w.de ") > -1) {
            term = term.replace("!w.de ", "");
            form.action="http://en.wikipedia.org/wiki/" + term;
            $("#searchTerm-js").val("");
            form.submit();
        }else if(term.indexOf("!w ") > -1) {
            term = term.replace("!w ", "");
            form.action="http://en.wikipedia.org/wiki/" + term;
            $("#searchTerm-js").val("");
            form.submit();
        }
        if(term.indexOf("!y ") > -1) {              //want to search youtube
            term = term.replace("!y ", "");         //take away the "command"
            form.action="http://youtube.com/results";//set URL
            $("#searchTerm-js").val(term);          //set what to search for
            $("#searchTerm-js").attr("name", "search_query"); //Change name of input
            form.method="GET";                      
            form.submit();                          //Do search
        }
    } else {
        form.action="http://google.com/search";
        $("#searchTerm-js").val(term);
        form.method="GET";
        form.submit();
    }
}

//---------------------------------------------------------------------
/*
	Images
	
	Multiple arrays containing images.
	Each image is an object and build like:
		{
			src: link to image
			desc: a short (up to 4 words) description of the image
			credit: who deserves credit
			link: assuming CC, need to link to somewhere (like flickr)
		}
*/
//---------------------------------------------------------------------

var general = [
	{
		src: 'https://farm3.staticflickr.com/2340/2040615896_498a115e61_o.jpg',
		desc: 'Forest on fire',
		credit: 'Wolfgang Staudt',
		link: 'https://www.flickr.com/photos/53074617@N00/2040615896/'
	},
	{
		src: 'https://farm3.staticflickr.com/2946/15349166041_e2012546ec_k.jpg',
		desc: 'Autum forest',
		credit: 'Olli',
		link: 'https://www.flickr.com/photos/84814657@N04/15349166041/'
	},
	{
		src: 'https://farm8.staticflickr.com/7153/6830946505_494e7aafb2_o.jpg',
		desc: 'Ayr, Scotland',
		credit: 'Graeme Law',
		link: 'https://www.flickr.com/photos/14534290@N04/6830946505/'
	},
	{
		src: 'https://farm9.staticflickr.com/8233/8369468069_2f7a342bcf_k.jpg',
		desc: 'Bixad, Romania',
		credit: 'János Csongor Kerekes',
		link: 'https://www.flickr.com/photos/30420396@N03/8369468069/'
	},
	{
		src: 'https://farm4.staticflickr.com/3187/2904369145_daf89c90f2_o.jpg',
		desc: 'Lake in Colorado',
		credit: 'ellenm1',
		link: 'https://www.flickr.com/photos/47051377@N00/2904369145/'
	},
	{
		src: 'https://farm4.staticflickr.com/3891/14392592291_d8f102a7ae_k.jpg',
		desc: 'Lake in Idaho',
		credit: 'megaguilarphotography',
		link: 'https://www.flickr.com/photos/megaguilarphotography/14392592291/in/photostream/'
	}
]

/*
	Checks the current background image and updates it if need be.
*/
function updateBackground() {
	var index = Math.ceil(Math.random() * images.length) - 1;
	$('body').css('background-image', 'url('+ images[index].src +')');
}