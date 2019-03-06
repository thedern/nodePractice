// jquery

$( document ).ready(function() {
    console.log("in ajax");
    var $h1 = $("h1");
    var $h3 = $("h3");
    var $zip = $("input[name='zip']");

    $("form").on("submit", function(event) {
        event.preventDefault();
        var zipCode = $.trim($zip.val());
        $h1.text("loading...");

        // ajax call, get request to api
        var request = $.ajax({
            // uses router in zips.js for get requests /<5 digits>
            url: "/" + zipCode,
            datatype: "json"
        });

        // note, not using promises

        // data returned by api
        request.done(function(data) {
            var temperature = data.temperature;
            var city = data.city;
            var state = data.state;
            $h1.html(`It's ${temperature}&#176; in ${zipCode}`)
            $h3.html(`City: ${city} || State: ${state}`);
        });

        request.fail(function(){
            $h1.text("Error! ...No Such Zip");
            $h3.text("Please re-enter zip");
            $zip.val("");
        });


    }); // end form function

}); // end wrapper function
