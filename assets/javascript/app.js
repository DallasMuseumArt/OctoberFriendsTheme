(function($) {
    $(document).ready(function() {
        $('#user-profile button').click(function(e) {
            window.scrollTo(0, 0);
            return $('#user-profile').parsley().validate();
        });
    });
})(jQuery);