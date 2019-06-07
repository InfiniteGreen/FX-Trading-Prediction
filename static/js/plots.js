// var apiKey = "K827EbDqhXHVAureLYdw";

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
// function unpack(rows, index) {
//   return rows.map(function(row) {
//     return row[index];
//   });
// }

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  // var stock = d3.select("#stockInput").node().value;
  var fx = d3.select("#fxInput").node().value;
  // console.log(fx);

  // clear the input value
  // d3.select("#stockInput").node().value = "";
  d3.select("#fxInput").node().value = "";

  // Build the plot with the new fx pair
  // buildPlot();
  buildPlot(fx);
}

function getData(dataset) {
  // console.log(dataset)

  // var data = [];
  // switch (dataset) {
  // case "dataset1":
  //   data = [1, 2, 3, 39];
  //   break;
  // case "dataset2":
  //   data = [10, 20, 30, 37];
  //   break;
  // case "dataset3":
  //   data = [100, 200, 300, 23];
  //   break;
  // default:
  //   data = [30, 30, 30, 11];
  // }
  // updatePlotly(data);
}

function buildPlot(fx) {
  // var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;
  
  // var url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&count=30&granularity=D`;
  // var url = https://api-fxtrade.oanda.com/v1/candles?instrument=EUR_USD&candleFormat=midpoint&granularity=D&start=2016-06-19&end=2019-01-20
  var url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&granularity=D&start=2016-01-01&end=2016-12-31`
  
  
  // console.log(url);


  d3.json(url).then(function(response) {
    // console.log(response);  
    var name = response.instrument;
    // console.log(name);  
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

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);

// function init() {
//   var data = [{
//     values: [19, 26, 55, 88],
//     labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.plot("pie", data, layout);
// }

// function updatePlotly(newdata) {
//   var PIE = document.getElementById("pie");
//   Plotly.restyle(PIE, "values", [newdata]);
// }

// function getData(dataset) {
//   var data = [];
//   switch (dataset) {
//   case "dataset1":
//     data = [1, 2, 3, 39];
//     break;
//   case "dataset2":
//     data = [10, 20, 30, 37];
//     break;
//   case "dataset3":
//     data = [100, 200, 300, 23];
//     break;
//   default:
//     data = [30, 30, 30, 11];
//   }
//   updatePlotly(data);
// }

// init();

