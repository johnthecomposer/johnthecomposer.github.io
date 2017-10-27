
$(document).ready(function(){

     // event handlers
     var display_limit = 3;
     $('#load-more').click(function(){
          if($(this).text() === 'Load more'){
               display_limit = false;
               //$(this).text('Show less');
               $(this).hide();
          }
          else{
               $(this).text('Load more');
               display_limit = 3;
          }
          renderAccountInformation(data.accounts, 'accounts-table');
     });
     $('.sort-arrow').click(function(){
          $(this).siblings('.sortable').click();
     });
     $('.sortable').click(function(){
          var clicked_elm_id = $(this).prop('id');
          $('.sortable').each(function(){
               var sort_arrow = $(this).siblings('.sort-arrow');
               if($(this).prop('id') !== clicked_elm_id){
                    sort_arrow.removeClass('visible');
                    $(this).parents('.table-cell').removeClass('sort-active');
               }
               else{
                    $(this).parents('.table-cell').addClass('sort-active');
                    if(sort_arrow.hasClass('visible')){
                         sort_arrow.toggleClass('ascending descending');
                    }
                    else{
                         sort_arrow.addClass('visible');
                    }
                    var sort_field = clicked_elm_id;
                    var sort_type = sort_arrow.hasClass('ascending') ? 'ascending' : 'descending';
                    sortArrayOfObjects(data.accounts, clicked_elm_id, sort_type);
                    renderAccountInformation(data.accounts, 'accounts-table');
               }
          });
     });


     // formatting and sorting
     // Source: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
     var formatAsCurrency = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
       minimumFractionDigits: 2
     });
     var formatAsPercentage = new Intl.NumberFormat('en-US', {
       style: 'percent',
       currency: 'USD',
       minimumFractionDigits: 2
     });
     var getStringOperator = function(val){
          var operator = '';
          if(val > 0){
               operator = '+';
          }
          return operator;
     }
     var getChangeType = function(val){
          var type = 'nochange';
          if(val < 0){
               type = 'negative';
          }
          else if(val > 0){
               type = 'positive';
          }
          return type;
     }
     // Source: https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
     var sortArrayOfObjects = function(data, prop, type){
          var sorted = type === 'ascending' ?
               data.sort((a, b) => Number(a[prop]) - Number(b[prop])) :
               data.sort((a, b) => Number(b[prop]) - Number(a[prop]));
     }


     // rendering
     var renderAccountInformation = function(data, container_id){
          var container = $('#' + container_id);
          var header = $('#table-header');
          $('.table-row').remove();
          var i;
          var display_count;
          if(display_limit){
               display_count = display_limit;
               $('#load-more').show();
          }
          else{
               display_count = data.length;
          }
          for(i = 0; i < display_count; i++){
               var item = data[i];
               var cash = formatAsCurrency.format(item.cash);
               var prev_cash = formatAsCurrency.format(item.prev_cash);
               var percentage = getStringOperator(item.percentage) + formatAsPercentage.format(item.percentage);
               var changes_data = percentage + ' / ' + prev_cash;
               var table_row = $('<div></div>').
                    addClass('table-row');
                    var account_table_cell = $('<span></span>').
                         addClass('table-cell');
                         var account = $('<span></span>').
                              addClass('account-name').
                              text(item.type + '-' + item.id_txt);
                    account_table_cell.append(account);
                    var changes_table_cell = $('<span></span>').
                         addClass('table-cell');
                         var available_cash = $('<div></div>').
                              addClass('available-cash').
                              text(cash);
                         var changes = $('<div></div>').
                              addClass(getChangeType(item.percentage) + ' changes').
                              text(changes_data);

               changes_table_cell.append(available_cash, changes);
               table_row.append(account_table_cell, changes_table_cell);
               container.append(table_row);
          }
          var load_more = $('#load-more');
          container.append(load_more);

     }

     // init
     sortArrayOfObjects(data.accounts, 'account_id', 'ascending');
     renderAccountInformation(data.accounts, 'accounts-table');
});
