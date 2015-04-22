(function($) {
    $(document).ready(function() {
        $('#user-profile button').click(function(e) {
            return $('#user-profile').parsley().validate();
        });

        $('#status').delay(200).fadeOut(); 
        $('#preloader').delay(500).fadeOut('slow'); 
        //$('body').delay(400).css({'overflow':'visible'});

        $(document).on('ajaxUpdate', function(){
            $('#status').fadeOut(); 
            $('#preloader').fadeOut('slow'); 
        });

        $('form').on('submit', function() {
            $('#status').fadeIn();
            $('#preloader').fadeIn('slow');
        });

        $('#layout-nav a, .primary-links a').click(function() {
            $('#status').fadeIn();
            $('#preloader').fadeIn('slow');            
        });
    });

})(jQuery);
