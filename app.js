document.getElementById('searchButton').addEventListener('click', function() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Configure it: GET-request for the URL /superheroes.php
    xhr.open('GET', 'superheroes.php', true);
    
    // Set up a function to handle the response
    xhr.onload = function() {
        if (xhr.status == 200) {
            // Get the response text (HTML)
            var responseHTML = xhr.responseText;
            
            // Create a temporary DOM element to parse the HTML
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseHTML;
            
            // Extract the list items
            var listItems = tempDiv.querySelectorAll('li');
            
            // Create an array to hold the superhero aliases
            var superheroList = [];
            listItems.forEach(function(item) {
                superheroList.push(item.textContent);
            });
            
            // Display the list in an alert
            alert('Superheroes: ' + superheroList.join(', '));
        } else {
            alert('Error: ' + xhr.status);
        }
    };
    
    // Send the request
    xhr.send();
});



