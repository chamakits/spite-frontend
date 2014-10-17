(function(that) {
    that.ToMenuLayout = function() {
        var emailLayout = document.getElementById('email-layout');
        if (emailLayout) {
            emailLayout.id = 'layout';
        }
    };
    that.ToEmailLayout = function() {
        var emailLayout = document.getElementById('layout');
        if (emailLayout) {
            emailLayout.id = 'email-layout';
        }
    };
})(this);