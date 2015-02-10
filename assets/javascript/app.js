(function($) {
    $(document).ready(function() {
        $('#user-profile button').click(function(e) {
            return $('#user-profile').parsley().validate();
        });
    });
})(jQuery);
