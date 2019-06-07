function handleSubmit() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var fx = d3.select("#fxInput").node().value;
  console.log(fx);

  // clear the input value
  d3.select("#fxInput").node().value = "";

  // Render the new fx stats in table
  renderTable(fx); 
};

// renderTable renders the filteredData to the tbody
function renderTable(fx) {


  //Populate table body
  d3.json(url).then(function(response) {
    console.log(response);  
    // var name = response.instrument;
    // // console.log(name);  
    // var closeMid = [];
    // var highMid = [];
    // var lowMid = [];
    // var openMid = [];
    // var time = [];
    
    // for (var i=0; i<response.candles.length; i++){
    //   // console.log(response.candles[i]);
    //   closeMid.push(response.candles[i].closeMid);
    //   highMid.push(response.candles[i].highMid);
    //   lowMid.push(response.candles[i].lowMid);
    //   openMid.push(response.candles[i].openMid);
    //   time.push(response.candles[i].time.substring(0,10));
    //   // console.log(time);
    // };

  var tbody = d3.select("tbody");

          
  tbody.html("");  

  // Iterate through each fileteredData and pend to table
  // filteredData.forEach(sighting => {
    
  //   var tbl_col = Object.keys(sighting);

  //   // console.log(tbl_col);

  //   var row = tbody.append("tr");

  //   tbl_col.forEach(s_info => {
  //     row.append("td").text(sighting[s_info]);     
  //   // console.log(sighting);
  //   // console.log(tbl_col);
  //   // console.log(s_info);
  //   });  
  // });

  for (var r=0; r<10; r++){

    var tbl_col = ["data", "open", "high", "low","close"];

    var row = tbody.append("tr");
    
    row.append("td").text(response.candles[r].time.substring(0,10));
    row.append("td").text(response.candles[r].openMid);
    row.append("td").text(response.candles[r].highMid);
    row.append("td").text(response.candles[r].lowMid);
    row.append("td").text(response.candles[r].closeMid);

    // for (var c=0; c<tbl_col.length; c++){
    //   row.append("td").text(response.candles[r].time.substring(0,10));
    //   row.append("td").text(response.candles[r].openMid);
    //   row.append("td").text(response.candles[r].highMid);
    //   row.append("td").text(response.candles[r].lowMid);
    //   row.append("td").text(response.candles[r].closeMid);
    //   console.log(response.candles[r].closeMid);
    // };

    console.log(response.candles[r]);
 
      // console.log(time);
    };


  });  


//   }); 
};


// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);