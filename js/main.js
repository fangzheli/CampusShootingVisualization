async function darkenDesks() {
  // Read data from the CSV file
  var csvFile = 'data.csv'; // replace with your file name
  var response = await fetch(csvFile);
  var data = await response.text();
  
  // Split the CSV file into rows and iterate through each row
  var rows = data.trim().split('\n');
  var deskIndex = 0
  var interval = 2000
  var level = 10
  for (var i = 0; i < rows.length; i++) {
      // Split each row into columns and get the number of desks to darken
      var cols = rows[i].split(',');
      var numDesks = parseInt(cols[0]);
      
      // Darken the required number of desks
      var desks = document.getElementsByClassName('desk');
      for (var j = 0; j < numDesks; j++) {
          desks[deskIndex].style.filter = "grayscale(100%)";
          deskIndex ++;
      }
      
      // Print the description to the right division
      var description = cols[1];
      var rightDiv = document.getElementById('right');
      rightDiv.innerHTML = '<p>' + description + '</p>';
      
      // Wait for 3 seconds before moving to the next row
      if (i < rows.length - 1) {
          await new Promise(resolve => setTimeout(resolve, interval - level * deskIndex));
          rightDiv.innerHTML = '';
      }
  }
}

// Call the function to start the simulation
darkenDesks();
