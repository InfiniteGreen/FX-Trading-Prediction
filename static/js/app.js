// from data.js
var tradeData = data;

// Create empty arrays to store info
var url = [];
var filteredData = [];

function handleSubmit() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var fx = d3.select("#fxInput").node().value;
  var ao = d3.select("#analysis_option").node().value; 
  
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
  var inputFXSymbol = fx.replace(/_/g, '/');
  // var tradeSymbol = [];
  var tradeOpenDate = [];
  var tradeCloseDate = [];
  var tradeOpenPrice = [];
  var tradeClosePrice = []; 
  var NetPnL = [];

  // Create an array with the filtered values
  filteredData = tradeData.filter(trade => {        
    if (inputFXSymbol === trade.Symbol){
      return true;
    }
    else {
      return false;
    };
  }); 
  console.log(filteredData);
  // console.log(Object.keys(filteredData));

  for (var i=0; i<filteredData.length; i++){
    // console.log(Object.keys(filteredData[i]));
    // console.log(filteredData[i]["Date Open"]);
    tradeOpenDate.push(filteredData[i]["Date Open"]);
    tradeCloseDate.push(filteredData[i]["Date Close"]);
    tradeOpenPrice.push(filteredData[i]["Bought"]);
    tradeClosePrice.push(filteredData[i]["Sold"]);
    NetPnL.push(filteredData[i]["Net P/L"]);
  };
  console.log(tradeOpenDate);
 
};

function filterTradeData (fx){
  var inputFXSymbol = fx.replace(/_/g, '/');
  // var tradeSymbol = [];
  var tradeOpenDate = [];
  var tradeCloseDate = [];
  var tradeOpenPrice = [];
  var tradeClosePrice = []; 
  var NetPnL = [];

  // Create an array with the filtered values
  filteredData = tradeData.filter(trade => {        
    if (inputFXSymbol === trade.Symbol){
      return true;
    }
    else {
      return false;
    };
  }); 
  // console.log(filteredData);
  

  //Loop through filteredData to get data to arrays
  for (var i=0; i<filteredData.length; i++){
    // console.log(Object.keys(filteredData[i]));
    // console.log(filteredData[i]["Date Open"]);
    tradeOpenDate.push(filteredData[i]["Date Open"]);
    tradeCloseDate.push(filteredData[i]["Date Close"]);
    tradeOpenPrice.push(filteredData[i]["Bought"]);
    tradeClosePrice.push(filteredData[i]["Sold"]);
    NetPnL.push(filteredData[i]["Net PL"]);
  };
  return {
    tradeOpenDate: tradeOpenDate,
    tradeCloseDate: tradeCloseDate,
    tradeOpenPrice: tradeOpenPrice,
    tradeClosePrice: tradeClosePrice,
    NetPnL: NetPnL
  };
};

function buildPlot(fx, ao) {
  var trace1 = {};
  var trace2 = {};
  var data = [];
  var layout = {};
  
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
    };  

  switch (ao) {
    //Case #1: Chart last 365 days of fx data  
    case "fx_general":
      trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: time,
        y: closeMid,
        line: {
          color: "blue"
        }
      };
      data = [trace1];
      layout = {
        title: `${fx} Last 365 Days Closing Prices`,
        xaxis: {
          range: [time[0], time[-1]],
          type: "date"
        },
      };
    break;

    // Case #2: Graph 2016 fx chart with Rectangle shape trade data 
    case "trade_fx":    
      
      var filteredTrades = filterTradeData (fx);     
      console.log(filteredTrades);
      
      var trace1 = {
        x: time,
        y: closeMid       
      };
      
      data = [trace1];

      // Handle the rectangles shapes for trade data
      var shapes_array = [];
      
      for (var t=0; t<filteredTrades.NetPnL.length; t++){
        var line_attr = {};
        var fill_color = "";

        // Green rectangles for positive NetPnL, Red rectangles for negative NetPnL
        if (filteredTrades.NetPnL[t] >= 0) {
          line_attr = {
              color: "green",
              width: 2
            };
          fill_color = "green";
        }
        else {
          line_attr = {
            color: "red",
            width: 2
          },
          fill_color =  "red";
        };          

        shape_attr = 
        {
          type: 'rect',
          x0: filteredTrades.tradeOpenDate[t],
          y0: filteredTrades.tradeOpenPrice[t],
          x1: filteredTrades.tradeCloseDate[t],
          y1: filteredTrades.tradeClosePrice[t],
          opacity: 0.3,
          line: line_attr,
          fillcolor: fill_color
        };

      // console.log(shape_attr);
      shapes_array.push(shape_attr); 
      // console.log(shapes_array);       
    };

      var layout = {
        title: `2016 ${fx} Chart with Trade Data`,
        xaxis: {
          range: [time[0], time[-1]],          
        },
        yaxis: {
          range: [closeMid[0], closeMid[-1]],
        },
        shapes: shapes_array   
      };
    break;

    //Case #3: Chart fx data only
    case "trade_analysis":
      handleTradeData (fx, ao);

      trace1 = {
        type: "scatter",
        mode: "lines",
        name: name,
        x: time,
        y: closeMid,
        line: {
          color: "blue"
        }
      };
      data = [trace1];
      layout = {
        title: `${fx} Trade`,
        xaxis: {
          range: [time[0], time[-1]],
          type: "date"
        },
      };
      break;
    //API with last 365 days of fx data   
    default:
      url = `https://api-fxtrade.oanda.com/v1/candles?instrument=${fx}&candleFormat=midpoint&count=365&granularity=D`;
    }

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
    // console.log(response);  

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

      // console.log(response.candles[r]);
    };

  });  

};


// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);