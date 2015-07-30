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

        $('.login-box .forgot-password').click(function() {
            $('#partialUserResetForm').toggle();
        });

        // Addresses a bug when touching a button when the keyboard is open
        $(document).on('touchend', 'form button', function (e) {
            $(e.target).click();
        });
    });

})(jQuery);
