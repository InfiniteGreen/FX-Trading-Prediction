function handleSubmit() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var fx = d3.select("#fxInput").node().value;
  var ao = d3.select("#analysis_option").node().value; 
  var url = [];
  // console.log(fx);
  // console.log(ao);

  // clear the input value
  d3.select("#fxInput").node().value = "";
  d3.select("#analysis_option").node().value = "";

  //Prepare the url for API scraping depending on the Analysis Option selected
  prepUrl(fx,ao);

  // Build the plot with the new fx pair  
  buildPlot(fx, ao);
  // Render the new fx stats in table
  renderTable(fx,ao); 
};

function prepUrl(fx,ao){  
  switch (ao) {
  //API with last 365 days of fx data  
  case "fx_general":
    url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&count=365&granularity=D`;
    break;
  //API for 2016 fx data 
  case "trade_fx":
    url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&granularity=D&start=2016-01-01&end=2016-12-31`;
    break;
  //API for 2016 fx data 
  case "trade_analysis":
    url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&granularity=D&start=2016-01-01&end=2016-12-31`;
    break;
  //API with last 365 days of fx data   
  default:
    url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&count=365&granularity=D`;
  }
  // console.log(url);
};

function handleTradeData (fx, ao) {

};

function buildPlot(fx, ao) {
  // console.log(url);
  d3.json(url).then(function(response) {
    // console.log(response);  
    var name = response.instrument;     
    var closeMid = [];
    var highMid = [];
    var lowMid = [];
    var openMid = [];
    var time = [];
    
    for (var i=0; i<response.candles.length; i++){
      // console.log(response.candles[i]);
      closeMid.push(response.candles[i].closeMid);
      highMid.push(response.candles[i].highMid);
      lowMid.push(response.candles[i].lowMid);
      openMid.push(response.candles[i].openMid);
      time.push(response.candles[i].time.substring(0,10));
      // console.log(time);
    };

    // console.log(time);
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: time,
      y: closeMid,
      line: {
        color: "blue"
      }
    };

  //   // Candlestick Trace
  //   var trace2 = {
  //     type: "candlestick",
  //     x: dates,
  //     high: highPrices,
  //     low: lowPrices,
  //     open: openingPrices,
  //     close: closingPrices
  //   };

  //   var data = [trace1, trace2];
  var data = [trace1];

  //   var layout = {
  //     title: `${stock} closing prices`,
  //     xaxis: {
  //       range: [startDate, endDate],
  //       type: "date"
  //     },
  //     yaxis: {
  //       autorange: true,
  //       type: "linear"
  //     }
  //   };

     var layout = {
      title: `${fx} closing prices`,
      xaxis: {
        range: [time[0], time[-1]],
        type: "date"
      },
      // yaxis: {
      //   autorange: true,
      //   type: "linear"
      // }
    };

    Plotly.newPlot("plot", data, layout);
  });
}



// renderTable renders the filteredData to the tbody
function renderTable(fx) {

  var tbl_col = ["Date", "Open", "High", "Low","Close"];

  //Populate table head
  var thead = d3.select("thead");          
  thead.html("");
  thead.append("tr");
  tbl_col.forEach(col => {
    thead.append("th").text(col);
  });
  
  //Populate table body
  
  d3.json(url).then(function(response) {
    console.log(response);  

    var tbody = d3.select("tbody");
            
    tbody.html("");  

    // loop to append data into table body
    for (var r=0; r<10; r++){   
      var row = tbody.append("tr");
      
      row.append("td").text(response.candles[r].time.substring(0,10));
      row.append("td").text(response.candles[r].openMid);
      row.append("td").text(response.candles[r].highMid);
      row.append("td").text(response.candles[r].lowMid);
      row.append("td").text(response.candles[r].closeMid);

      console.log(response.candles[r]);
    };


  });  


//   }); 
};


// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);