document.getElementById('searchButton').addEventListener('click', function() {
    // Get the search query from the input field and sanitize it
    var query = document.getElementById('searchInput').value.trim();
    
    // Sanitize the query to prevent malicious code injection
    query = query.replace(/[^a-zA-Z0-9 ]/g, ''); // Allow only letters, numbers, and spaces
    
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();
    
    // Configure it: GET-request for the URL /superheroes.php with query parameter
    xhr.open('GET', 'superheroes.php?query=' + encodeURIComponent(query), true);
    
    // Set up a function to handle the response
    xhr.onload = function() {
        if (xhr.status == 200) {
            // Get the response text (HTML)
            var responseHTML = xhr.responseText;
            
            // Create a temporary DOM element to parse the HTML
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = responseHTML;
            
            // Get the list of superheroes (li elements)
            var listItems = tempDiv.querySelectorAll('li');
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Clear any existing content
            
            // If the query is empty, show the full list of superheroes
            if (query === '') {
                var ul = document.createElement('ul');
                listItems.forEach(function(item) {
                    var li = document.createElement('li');
                    li.textContent = item.textContent;
                    ul.appendChild(li);
                });
                resultDiv.appendChild(ul);
            } else {
                var foundSuperhero = false;
                listItems.forEach(function(item) {
                    // Check if the alias or name matches the query
                    if (item.textContent.toLowerCase().includes(query.toLowerCase())) {
                        foundSuperhero = true;
                        var alias = item.getAttribute('data-alias');
                        var name = item.getAttribute('data-name');
                        var biography = item.getAttribute('data-biography');
                        
                        // Create HTML elements for the superhero's details
                        var h3 = document.createElement('h3');
                        h3.textContent = alias; // Alias with A.K.A
                        
                        var h4 = document.createElement('h4');
                        h4.textContent = "A.K.A " + name; // Real name
                        
                        var p = document.createElement('p');
                        p.textContent = biography; // Biography of the superhero
                        
                        // Append these elements to the result div
                        resultDiv.appendChild(h3);
                        resultDiv.appendChild(h4);
                        resultDiv.appendChild(p);
                    }
                });
                
                // If no superhero was found, show "Superhero not found"
                if (!foundSuperhero) {
                    resultDiv.innerHTML = '<p>Superhero not found</p>';
                }
            }
        } else {
            // Handle error if the AJAX request fails
            alert('Error: ' + xhr.status);
        }
    };
    
    // Send the request
    xhr.send();
});
