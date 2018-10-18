//Create an array of animals and create buttons for the animals in the array
// Do an on click even on the button and call the API
// On the click of the button display GIF's associated to that animal 
// Add an option to add more animals to the array

$(document).ready(function(){

    var button = $("#buttons");

    var topics = ["Cat", "Dog"];

    renderButtons();

    function renderButtons() {
        button.empty();

        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            console.log(topics[i]);
            var a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("animal-btn btn btn-primary");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the buttons-view div
            button.append(a);
        }
    }

        $(document).on("click", ".animal-btn", displayGIF);

        function displayGIF(){

            console.log("style");

            var animal = $(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=IgnqCFH5I79Pk4zMESYa8lxAZ1pWaiuJ&limit=10&q="+animal;
            
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                for(var i=0; i<response.data.length; i++){
                      
                // Creating a div to hold the animal gif
                var animalDiv = $("<div class='animialDiv'>");

                // Storing the rating data
                var rating = response.data[i].rating;

                // Creating an element to have the rating displayed
                var pOne = $("<p>").text("Rating: " + rating);

                // Displaying the rating
                animalDiv.append(pOne);

                // Creating Variable to store imgage tag
                var imageTag = $("<img>");

                // Creating class for image tag
                imageTag.addClass("gif");

                // Retrieving the URL for the image
                var imgURL = response.data[i].images.original.url;
                var imgStill = response.data[i].images.original_still.url;

                // Creating an element to hold the image attributes
                var imageSrc = imageTag.attr("src", imgStill);
                var imageStill = imageTag.attr("data-still", imgStill);
                var imageAnimate = imageTag.attr("data-animate", imgURL);
                var imageState = imageTag.attr("data-state", "still");

                // Appending the image
                animalDiv.append(imageSrc, imageStill, imageAnimate, imageState);

                // Adding CSS properties to the animal DIV
                animalDiv.css("float", "Left");
                animalDiv.css("margin", "10px");

                // Putting the entire animal div above the previous movies
                $("#giphy").prepend(animalDiv);
                }    
            });
        }

        // This function handles events where a animal button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var addAnimal = $("#animal-input").val().trim();

        // Adding animal from the textbox to our array
        topics.push(addAnimal);

        // Calling renderButtons which handles the processing of our animal array
        renderButtons();
      });

      // On Click function to change the gif to animate or to still
      $(document).on("click", ".gif", function(){
        console.log(this);

        // Storing the state of gif to an element
        var currentState = $(this).attr("data-state");
        console.log("before changing "+currentState);
        //console.log($(this));

        // checking the condition of the gif clicked
        if(currentState == "animate"){
            //console.log($(this));
            $(this).attr("src", $(this).attr("data-still"));
            //console.log($(this));
            $(this).attr("data-state", "still");
            //console.log("new state after changing from animate is "+$("img").attr("data-state"))
        }    
        else{
            //console.log($(this));
            $(this).attr("src", $(this).attr("data-animate"));
            //console.log($(this));
            $(this).attr("data-state", "animate");
            //console.log("new state after changing from still is "+$(this).attr("data-state"))
        }        
    });

});
