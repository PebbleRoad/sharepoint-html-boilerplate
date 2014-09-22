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

            this.toggleable();        

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
        },

        toggleable: function(){

            var $link = $('.js-mobile-toggle'),
                $content = $('.is-mobile-collapsible');

            $body.on('click', '.js-mobile-toggle', function(e){

                $link.toggleClass('active');

                $content.toggleClass('is-expanded');

                e.preventDefault();
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