'use strict';

var Emitter = require('emitter')
  , inGroupsOf = require('in-groups-of')
  , templateEl = document.createElement('table')
;

// Setup template
templateEl.className = 'calendar-table';
templateEl.innerHTML = '<thead></thead><tbody></tbody>';

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  , days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  , daysInMonthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
;

/**
 * Get days in `month` for `year`.
 *
 * @param {Number} month
 * @param {Number} year
 * @return {Number}
 * @api private
 */
function daysInMonth(month, year) {
    if (month === 1 && isLeapYear(year)) return 29;
    return daysInMonthArr[month];
}

/**
 * Check if `year` is a leap year.
 *
 * @param {Number} year
 * @return {Boolean}
 * @api private
 */

function isLeapYear(year) {
    return ((0 === year % 4) && (0 !== year % 100))
      || (0 === year % 400)
      || (0 === year)
    ;
}

function dateAttr(date) {
    var arr = arguments.length === 1 ? [ date.getFullYear(), date.getMonth() + 1, date.getDate() ] : [ arguments[0], arguments[1] + 1, arguments[2] ];
    return arr.join('/');
}

function dayHTML(year, month, day, className) {
    return '<td data-date="' + dateAttr(year, month, day) + '"' + (className !== undefined ? ' class="' + className + '"' : '') + '><div class="day">' + day + '</div></td>';
}

function Calendar(options) {
    
    Emitter.call(this);
    
    this.options = options || {};
    
    // construct el
    this.el = templateEl.cloneNode(true);
    this._head = this.el.querySelector('thead');
    this._body = this.el.querySelector('tbody');
    
    this.renderHead();
    this.setDate(this.options.date || new Date());
    
}

/**
 * Expose helper methods
 */
Calendar.isLeapYear = isLeapYear;
Calendar.daysInMonth = daysInMonth;
Calendar.weekDays = days;
Calendar.months = months;
Calendar.dateAttr = dateAttr;

Emitter(Calendar.prototype);

Calendar.prototype.renderHead = function (len) {
    
    var self = this;
    
    this._head.innerHTML = '<tr class="subheading">' + days.map(function(day){
        return '<th>' + day.slice(0, self.options.headLength || 2) + '</th>';
    }).join('') + '</tr>';
    
    return self.emit('render head');
    
};

Calendar.prototype.render = function () {
    
    var start = new Date(this._date)
      , month = start.getMonth()
      , year = start.getFullYear()
      , inMonth = daysInMonth(month, year)
    ;
    
    start.setDate(1); // Should already be the first day if using setter
    
    var beforeDate = new Date(start)
      , daysBefore = start.getDay()
      , total = 7 * Math.ceil((inMonth + daysBefore) / 7)
      , afterDate = new Date(start)
      , daysAfter = total - (inMonth + daysBefore)
      , afterDay = 0
    ;
    
    beforeDate.setMonth(month - 1);
    afterDate.setMonth(month + 1);
    
    var beforeDays = daysInMonth(beforeDate.getMonth(), beforeDate.getFullYear())
      , afterDays = daysInMonth(afterDate.getMonth(), afterDate.getFullYear())
      , cells = []
      , rows
      , day = 0
    ;
    
    while (daysBefore--) {
        cells.unshift(dayHTML(beforeDate.getFullYear(), beforeDate.getMonth(), beforeDays--, 'before-day'));
    }
    
    while (day++ < inMonth) {
        cells.push(dayHTML(year, month, day));
    }
    
    while (daysAfter--) {
        cells.push(dayHTML(afterDate.getFullYear(), afterDate.getMonth(), ++afterDay, 'after-day'))
    }
    
    rows = inGroupsOf(cells, 7);
    
    this._body.innerHTML = rows.map(function (row) {
        return '<tr>' + row.join('') + '</tr>';
    }).join('');
    
    return this.emit('render', this._date);
    
};

Calendar.prototype.setDate = function (date) {
    
    // Private instance of the supplied date. Will parse strings if passed
    date = new Date(date);
    
    date.setDate(1); // Prevent overflowing month
    this._date = date;
    
    this
      .emit('change year', date.getFullYear())
      .emit('change month', date.getMonth())
      .emit('change', date)
    ;
    
    return this.render();
};

Calendar.prototype.setMonth = function (month) {
    
    var prevYear = this._date.getFullYear()
      , year
    ;
    
    this._date.setMonth(month);
    
    year = this._date.getFullYear();
    
    if (prevYear !== year) {
        this.emit('change year', year);
    }
    
    this
      .emit('change month', this._date.getMonth())
      .emit('change', this._date)
    ;
    
    return this.render();
};

Calendar.prototype.setYear = function (year) {
    this._date.setFullYear(year);
    
    this
      .emit('change year', year)
      .emit('change', this._date)
    ;
    
    return this.render();
};

Calendar.prototype.nextMonth = function () {
    return this.setMonth(this._date.getMonth() + 1);
};

Calendar.prototype.prevMonth = function () {
    return this.setMonth(this._date.getMonth() - 1);
};

Calendar.prototype.nextYear = function () {
    return this.setYear(this._date.getFullYear() + 1);
};

Calendar.prototype.prevYear = function () {
    return this.setYear(this._date.getFullYear() - 1);
};

Calendar.prototype.initEmit = function () {
    this
      .emit('change year', this._date.getFullYear())
      .emit('change month', this._date.getMonth())
      .emit('change', this._date)
    ;
};

module.exports = Calendar;