# jQuery Spinning Numbers
Lets you simply create spinning numbers in a slot machine effect.

## Example

Just run demo.html and see it for yourself. Here is a quick usage:

  ```
  $("#credits").spinning({ initial_value:200 });
  var scoreView = $('#credits').data("spinning");
  scoreView.increment(10);
  ```

## Options

id_prefix (string)
  Default: $(element).attr('id')

  You can have multiple scrolling numbers on a page, provided the containing element has an ID.  It will automatically prepend the classes for the digits with the ID of the parent element (i.e. the one you targeted in the invocation of the spinner), but you can override this by setting the id_prefix explicitly.


initial_value (integer)
  Default: 0

  This is the number from which you want to start counting.


number_height (integer)
  Default: 60

  You can use your own font face and font size in the image for the numbers. This allows you can set the height so that the characters will line up properly.

insert_commas (boolean)
  Default: false

  When true, will insert a comma after every third digit from the right.


## Advanced Example
The example below has 4 spinners, each of which has an initial value that is as many characters long as the target value, which is then subtracted from the target value so it arrives at the correct figure.  This was to ensure that the commas were properly placed, and the spinners rolled over to add one more leading character.

  ```
  <h2>
    You&#039;ve saved:
  </h2>
  <div class='statistic' id='trees_saved'></div>
  <div class='stats-trailer'>
    trees
  </div>
  <div class='statistic' id='gallons_saved'></div>
  <div class='stats-trailer'>
    gallons of water
  </div>
  <div class='statistic' id='pounds_co2_saved'></div>
  <div class='stats-trailer'>
    pounds of CO<sub>2</sub>
  </div>
  <div class='statistic' id='pounds_waste_saved'></div>
  <div class='stats-trailer'>
    pounds of landfill
  </div>

  <script type='text/javascript'>
    //<![CDATA[
      $(document).ready(function() {
        var initial_values = {
          'trees_saved': 785917,
          'gallons_saved': 788315983,
          'pounds_co2_saved': 327327228,
          'pounds_waste_saved': 116033097
        }

        $.each(initial_values, function(key, value) {
          var initial_value_string = "1" + new Array((value).toString().length - 1).join("0");
          $("#" + key).spinning({
            initial_value: parseInt( initial_value_string  ),
            number_height: 14
          }).data("spinning").increment(value - parseInt(initial_value_string));
        });
      });
    //]]>
  </script>
  ```

