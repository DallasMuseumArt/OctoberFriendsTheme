(function($) {

    var idleTime = 0;

    $(document).ready(function() {
        // Automatically logout authorized kiosks after a specific amount of inactivity
        // if (app.isKiosk) {
        //     //Increment the idle time counter every minute.
        //     var idleInterval = setInterval(idleTimeout, app.kiosk_idle_time * 1000); 

        //     //Zero the idle timer on mouse movement.
        //     $(this).mousemove(function (e) {
        //         idleTime = 0;
        //     });
        //     $(this).keypress(function (e) {
        //         idleTime = 0;
        //     });

        //     function idleTimeout() {
        //         // TODO ajax call to logout callback
        //     }
        // }

    });

})(jQuery);