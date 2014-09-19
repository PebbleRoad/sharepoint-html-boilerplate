(function($, window){

    'use strict';

    var PRSP = window.PRSP || {},
        $document = $(document),
        $html = $('html'),
        $body = $('body');

    /**
     * Utility functions     
     */
    PRSP.utilities = {

        focusInput: function(container){

            container.find(':input').eq(0).focus();

        }

    };

    /**
     * User Interactions
     */
    
    PRSP.UI = {

        initialize: function(){

            this.dropdown();            

        },

        dropdown: function(){

            var $dropdown = $('.ui-dropdown'),
                $dropcontent = $('.dropdown');

            $body.off('click.dropdown').on('click.dropdown', '.ui-dropdown', function(e){

                var $this = $(this);

                $dropdown
                    .not($this)
                    .removeClass('dropdown-active');

                $(this).toggleClass('dropdown-active');

                e.preventDefault();
                e.stopPropagation();

            });

            $dropcontent.click(function(e){
                e.stopPropagation();
            })

            $html.click(function(){
                $dropdown.removeClass('dropdown-active');
            })
        }
    };

    


    /**
     * On body load
     */
    
    $(function(){

        PRSP.UI.initialize();

    });

    $body.bind('tapestry.completed', function(){
        
        PRSP.UI.initialize();
    })

})(jQuery, window, undefined);