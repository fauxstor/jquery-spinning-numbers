/**
 jQuery Spinning Numbers v. 0.9
 by Sarp Erdag
 Additional contributions by Justin Foster
*/

(function($) {
  $.extend($.fx.step,{
      backgroundPosition: function(fx) {
            if (fx.state === 0 && typeof fx.end == 'string') {
                var start = $.curCSS(fx.elem,'backgroundPosition');
                start = toArray(start);
                fx.start = [start[0],start[2]];
                var end = toArray(fx.end);
                fx.end = [end[0],end[2]];
                fx.unit = [end[1],end[3]];
      }
            var nowPosX = [];
            nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
            nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];
            fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

           function toArray(strg){
               strg = strg.replace(/left|top/g,'0px');
               strg = strg.replace(/right|bottom/g,'100%');
               strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
               var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
               return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
           }
        }
  });

  var Spinning = function(element, options)
    {
        var elem = $(element);
        var obj = this;

        var settings = $.extend({
            initial_value: 0,
            id_prefix: $(element).attr('id'),
            number_height: 60,
            insert_commas: false
        }, options || { });

        var final_value;
        var digit_count = 0;

        var initial_value = settings["initial_value"].toString();
        var id_prefix = settings["id_prefix"].toString();
        var numberHeight = parseInt(settings["number_height"]);
        var insertCommas = settings["insert_commas"];

        var i = 0;
        digit_count = initial_value.length;
        for (i=0;i<digit_count;i++){
            $(element).append("<div id='" + id_prefix + "_" + i + "' class='digit'></div>");
            if (insertCommas === true && (digit_count - i) % 3 === 0) {
                console.error("digit_count: " + digit_count + "  i: " + i);
                $(element).append("<div class='comma'>,</div>");
            }
            $("#" + id_prefix + "_" + i).css({backgroundPosition: "0px -" + initial_value[i] * numberHeight + "px"});
        }
        final_value = parseInt(initial_value);

        this.increment = function(amount) {
            final_value = final_value + amount;
            final_value = final_value.toString();

            new_digit_count = final_value.length;
            if(new_digit_count>digit_count){
                var pos = new_digit_count-1;
                if (insertCommas === true && (new_digit_count - i) % 3 === 0 && i !== 0) {
                    console.warn(i);
                    $(element).append("<div class='comma'>,</div>");
                }
                $(element).append("<div id='" + id_prefix + "_" + pos + "' class='digit'></div>");
            }
            for (i=0;i<new_digit_count;i++){
                $("#" + id_prefix + "_" + i).animate({backgroundPosition:"(0px -" + (final_value[i] * numberHeight) + "px)"}, {duration:800});
            }

            final_value = parseInt(final_value);
            digit_count = new_digit_count;
        };
    };

    $.fn.spinning = function(options)
    {
        return this.each(function()
        {
            var element = $(this);
            if (element.data('spinning')) return;
            var plugin = new Spinning(this, options);
            element.data('spinning', plugin);
        });
    };
})(jQuery);
