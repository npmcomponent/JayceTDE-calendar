var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  , months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
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
