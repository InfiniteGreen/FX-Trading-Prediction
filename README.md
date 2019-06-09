# FX Trading Analysis

## Background

Dan Li working on FX Trading Analysis.

## Project Phases:

### Phase 1: Basic Chart with Analysis Options

#### Functions:

1. User can select from 7 major FX pairs
2. User can select 3 analysis modes: "FX General Info", "FX & Trading Info", and "Trade Analysis"

#### Analysis mode details:
1. FX General Info:
* API call to get last 365 days of general FX pair data
* Plotly line Chart 
* Table of 10 days of FX pair data from API call

2. FX & Trading Info
* API call to get Year 2016 general FX pair data
* Filter user 2016 trade data for the FX pair
* Plotly line Chart 2016 fx pair general data with trade data as Rectangle shapes. (Rectangle shapes represents trades, green for made $, red for lost $)
* Table of FX pair trade data (Trade specific Table Heading and Table body)

3. Trade Analysis
* Plotly Bar Chart for all trade data. (green for made $, red for lost $)
* List Summary FX pair trade data in table

### Phase 2: Multiple Chart per Analysis Option

1. FX General Info:
* API call to get last 365 days of general FX pair data
* Plotly line Chart 
* Table of 10 days of FX pair data from API call

2. FX & Trading Info
* API call to get Year 2016 general FX pair data
* Filter user 2016 trade data for the FX pair
* Plotly line Chart 2016 fx pair general data with trade data as Rectangle shapes. (Rectangle shapes represents trades, green for made $, red for lost $)
* Table of FX pair trade data

3. Trade Analysis
* Plotly Bar Chart for all trade data. (green for made $, red for lost $)
* Table of FX pair trade data

### Phase 3: Advanced Custom features
* Allow user upload their own trading data for analysis 
* Add important dates to the exsiting chart (release of important contry data releases)  
* Allow user to add text to chart (i.e. Important event)?
* Add Wave theory Points?

### Dataset

* Sample trader 2016 trading data from:
2015: https://www.kaggle.com/zayedshah/trades-2015/downloads/Trades%202015.xlsx/1
2016: https://www.kaggle.com/zayedshah/fx-trading-analysis-part-2

* Year on year trading analysis:
https://www.kaggle.com/zayedshah/fx-trading-analysis-part-3 

**Good luck!**


### Copyright

Dan Li © 2019. All Rights Reserved.

