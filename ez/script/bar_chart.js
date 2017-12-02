/*
EquityZen Programming Challenge - solution by John Celentano - john.celentano@gmail.com
*/
let charMap = [
  {letter: "A", lcount: 0},
  {letter: "B", lcount: 0},
  {letter: "C", lcount: 0},
  {letter: "D", lcount: 0},
  {letter: "E", lcount: 0},
  {letter: "F", lcount: 0},
  {letter: "G", lcount: 0},
  {letter: "H", lcount: 0},
  {letter: "I", lcount: 0},
  {letter: "J", lcount: 0},
  {letter: "K", lcount: 0},
  {letter: "L", lcount: 0},
  {letter: "M", lcount: 0},
  {letter: "N", lcount: 0},
  {letter: "O", lcount: 0},
  {letter: "P", lcount: 0},
  {letter: "Q", lcount: 0},
  {letter: "R", lcount: 0},
  {letter: "S", lcount: 0},
  {letter: "T", lcount: 0},
  {letter: "U", lcount: 0},
  {letter: "V", lcount: 0},
  {letter: "W", lcount: 0},
  {letter: "X", lcount: 0},
  {letter: "Y", lcount: 0},
  {letter: "Z", lcount: 0},
  {letter: "Other", lcount: 0}
];

let searchUsersUrl = 'https://api.github.com/search/users?q=';
let url = '';
let headerLinks = {};
let range = 5;
let initPageNum = 1;
let qinitPageNum = '&page=' + initPageNum;
let qLimitPerPage = '&per_page=' + range;
let startIndex = 0;
let searchTerm = '';
let searchResults;

const setSearchTerm = () => searchTerm = $('#search').val();

const setUrl = action => {
  url = action === 'go' ?
    searchUsersUrl + searchTerm + qinitPageNum + qLimitPerPage :
    headerLinks[action];
}

const setHeaderLinks = entries => {
  headerLinks = {};
  // Source for entries(): https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
  for(let pair of entries){
    if(pair[0] === 'link'){
      links = pair[1];
      links.split(',').map(h => {
          let p = h.split(';');
          let rel = p[1]
            .replace(/rel=/, '')
            .replace(/"/g, '')
            .trim();
          let link = p[0]
            .replace(/[<>]/g, '')
            .trim();
          headerLinks[rel] = link;
      });
      console.log(headerLinks);
      break;
    }
  }
}

const handlePaginationButtons = () => {
  $('.pagination').each((index, elm) => {
    let enable = typeof headerLinks[elm.id] === 'undefined';
    $(elm).prop('disabled', enable);
  });
}

const validateSearchTerm = () => {
  if(searchTerm.length){
    return true;
  }
  else{
    $("#chart").empty();
    //$("#result").empty();
    $('section').hide();
    return false;
  }
}

const search = (url, callback) => {
  fetch(url)
  .then(response => {

/* set pagination from header links */

    // Source for entries(): https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
    setHeaderLinks(response.headers.entries());
    handlePaginationButtons();
    return response;
  })
  .then(response => {
    if (!response.ok) {
      throw Error("Network request failed")
    }
    return response;
  })
  .then(d => d.json())
  .then(d => {
    console.log(d)
    searchResults = d;
    callback(searchResults)
    return d;
  }, () => {
    console.log('request failed')
    return "Request failed.";
  })
}

const display = results => {

/* handle results */

  let r = results.items;

/* reset counts */

  let data = charMap.map(d => {
      d.lcount = 0
      return d;
    }
  );
//  $('#result').html(JSON.stringify(r, null, 4));
  $('#chart').empty();
  $('section').show();


/* find and count matches */

  // for each user
  r.map(r => {
    // split login into array of characters
    let loginChars = r.login.split('');
    let foundIndex = -1;
    // for each character in login
    loginChars.map(c => {
      // search for the character in the data array
      foundIndex = data.findIndex(l => l.letter.toLowerCase() === c.toLowerCase());
      // if found, increment its count
      if(foundIndex > -1){
        data[foundIndex].lcount += 1;
      }
      // if not, increment the 'other' count (the last element in the data array)
      else{
        data[26].lcount += 1;
      }
    });
  });


/* render the results */

  // Source for d3 bar chart -- copied directly from: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
  // modified the code to interpret the data and added svg:title elements for tooltips

  // set the dimensions and margins of the graph
  let margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  let x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  let y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  let svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.letter; }));
    // y.domain([0, d3.max(data, function(d) { return d.lcount; })]);
    y.domain([0, d3.max(data, function(d) { return d.lcount; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter()
        .append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.letter); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.lcount); })
          .attr("height", function(d) { return height - y(d.lcount); })
        .append("svg:title")
          .text(function(d) { return d.lcount });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
}
