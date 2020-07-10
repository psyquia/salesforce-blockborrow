({
    loadJquery : function(component, event, helper) {
        jQuery(document).ready(function(){
            var maxLength = 100;
            $('textarea').keyup(function() {
                var length = $(this).val().length;
                var length = maxLength-length;
                $('#chars').text(length);
            });
            $('textarea').hover(function(){
                $( this ).fadeOut(100);
                $( this ).fadeIn( 500 );
                
            });
            $('#my_iframe').attr("allowfullscreen", "allowfullscreen");
        	$('#my_iframe').attr("src", "https://www.youtube.com/embed/lTuE4oWD6hU");
        });
    },
    updateValue : function(component, event, helper) {
        var val = component.find("myInput").getElement().value;
        component.set("v.greeting", val);
    },
    
    doRender : function(component, event, helper) {
        
        var title = document.getElementById("title");		
        	
    },
    
    handleClick : function(component, event, helper) {
		$( '#my_iframe' ).fadeOut(100);
        $( '#my_iframe' ).fadeIn( 500 );
        $( '#my_iframe' ).attr("src","https://www.youtube.com/embed/HZQ1BGr7m9A");
    }
})