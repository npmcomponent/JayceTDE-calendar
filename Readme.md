
# calendar

A basic calendar
  
Only 2 Dependencies:
- component/emitter
- component/in-groups-of

Additional controls can be added using additional components

## Plugins

- [JayceTDE/calendar-select](https://github.com/JayceTDE/calendar-select) - Date selecting
- [JayceTDE/calendar-controls](https://github.com/JayceTDE/calendar-controls) - Basic controls to change month and year

## Installation

    $ component install JayceTDE/calendar

## Example

```js

var Calendar = require('calendar')
  , cal = new Calendar({
    date: '2000/05/05',
    headLength: 5
  })
;

document.body.appendChild(cal.el);

```

## Events

- `render` () when the calendar is rendered
- `render head` () when the days of the week are rendered
- `change` (date) when there is any change to the date of the calendar
- `change month` (month) when the month of the calendar is changed
- `change year` (year) when the year of the calendar is changed

## API

### new Calendar(options)

Initialize a new Calendar

#### options.date

Initial date to render. defaults to `new Date`

#### options.headLength

Length of the week day names. defaults to `2` (ex: 'Sunday' -> 'Su')

### Calendar#setDate(date)

Render the calendar for the given `date`. If a string is used, it will be parsed with `new Date(str)`
    
### Calendar#setMonth(month)

Set the `month` of the calendar's current date and re-render. 0 - January, 11 - December

### Calendar#setYear(year)

Set the `year` of the calendar's current date and re-render.
    
### Calendar#nextMonth()
### Calendar#prevMonth()
### Calendar#nextYear()
### Calendar#prevYear()

### Calendar#render()

Renders the calendar. Called internally when the date is changed using the above methods
    
### Calendar#renderHead()

Renders the days of the week. Called when initialized.

To change the length each day, change Calendar#options.headLength, and call Calendar#renderHead()

### Calendar#getElementByDate(date)

Get the `TD` element that matches the `date` argument

### Calendar#initEmit()

Emits all change events (`change`, `change month`, `change year`) on the current date

This is useful for initially triggering events after attaching listeners
    
## License

  MIT
