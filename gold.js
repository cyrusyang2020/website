// ==UserScript==
// @name         gold
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @require      https://momentjs.com/downloads/moment.min.js
// @match        http://gold/attendance*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var createTag = function(tagName, attr) {
        var result = document.createElement(tagName);
        Object.keys(attr).forEach((key) => {
            result[key] = attr[key];
        });
        return result;
    };
    var weekData = [];
         [...document.querySelectorAll('tr.Text0')].forEach(tr => {
             var startTime = moment(tr.cells[1].innerText);
             var endTime = moment(tr.cells[2].innerText);
             var value = '';
             if (startTime.isValid() && endTime.isValid()){
                 value = moment.duration(endTime - startTime, 'ms');
                 weekData.push(value);
                 value = `${value.get('hours') - 1}h${value.get('minutes')}m`;
             } else {
                 if (weekData.length > 0 ){
                     var h = 0;
                     var m = 0;
                     weekData.forEach(w=> {
                         h += w.get('hours') - 1;
                         m += w.get('minutes');
                     });
                     h += m / 60;
                     value = `total:${Math.floor(h)}h${m % 60}m`;
                     weekData = [];
                 }

             }
             tr.appendChild(createTag('td', {
                 style:'width:100px',
                 innerText: value
             }))
         })

})();