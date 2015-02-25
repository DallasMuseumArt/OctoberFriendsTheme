(function($) {

    /** Carousel **/
    $('.registration-prev, .register').hide();

    $('#carousel-register').carousel({
        interval: false,
        wrap: false
    });

    checkButtons($('#carousel-register .item.active'));

    $('#carousel-register').on('slid.bs.carousel', function(e) {
        checkButtons($('#carousel-register .item.active'));

    });

    $('.registration-next').click(function(e) {
        var idx = $('.item.active').index();
        $('#register').parsley()
        	.asyncValidate('block' + idx)
            .done(function() {
            	// Group validation was successful
            	$('#carousel-register').carousel('next');
             });
        
        //Stop button of triggeting next slice in the carousel
        e.preventDefault();
        e.stopPropagation();
	
    })

    function checkButtons(obj) {

        var idx = $('.item.active').index();

        if (idx > 0) {
            $('.registration-prev').show();
        } else {
            $('.registration-prev').hide();
        }

        if (idx == 5) {
            $('.registration-next').hide();
            $('.register').show();
        } else {
            $('.register').hide();
            $('.registration-next').show();
        }
    
    }

    // Make avatars selectable
    $('.selectable').selectable({
        selected: function( event, ui ) {
            var fileName = $(ui.selected).find('img').attr('src');
            $('#avatar').val(fileName);
        }
    });

    // Custom Parsley validator
    ParsleyExtend.addAsyncValidator('validateUsername', function (xhr) {
    	// Ideally the validation should be base on HTTP codes 200 and 404
    	// But OctoberCMS framework always return 200. Throwing exceptions generated
    	// a HTTP code 500 and during my test this causes a strange behaivor in parsley  
    	return xhr.responseJSON['available'];
    }); 
      

})(jQuery);