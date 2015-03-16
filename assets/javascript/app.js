(function($) {
    $(document).ready(function() {
        $('#user-profile button').click(function(e) {
            return $('#user-profile').parsley().validate();
        });

        $('#status').fadeOut(); 
        $('#preloader').delay(500).fadeOut('slow'); 
        $('body').delay(400).css({'overflow':'visible'});

        $(document).on('ajaxUpdate', function(){
            console.log('Updated!');
            $('#status').fadeOut(); 
            $('#preloader').fadeOut('slow'); 
        });

        $('form').on('submit', function() {
            console.log('submit sent');
            $('#status').fadeIn();
            $('#preloader').fadeIn('slow');
        });
    });

})(jQuery);
