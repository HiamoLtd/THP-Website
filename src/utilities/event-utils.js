/*
* EVENT UTILITIES
*
* Helpful utility methods related to events.
*
* A lot of event data is informed by data inside Event Times,
* Child Events, etc. These methods help bring that data together,
* and gather display data based on it.
* 
*/


// --------------------
// EVENT STATUS METHODS
// --------------------

// If times all have the same status, return that status. Otherwise, return null.
const timeSharedStatus = (times) => {
  const firstTimeStatus = times[0].status;
  let timesShareStatus = true;

  for (let i = 0; i < times.length; i++) {
    if (times[i].status !== firstTimeStatus) {
      timesShareStatus = false;
      break;
    }
  }

  return timesShareStatus ? firstTimeStatus : false;
}

// Apply a single status tag to a parent event, based on the tags / status
// of its child events / event times
export function eventStatus(event) {
  if (!event) return;

  let status = event.status;

  // If all event times are marked with the same status, the event shows that status
  if (event.times?.length > 0) {
    const sharedStatus = timeSharedStatus(event.times);
    if (sharedStatus) status = sharedStatus;
  }

  // If all child events are marked with the same status, the parent shows that status
  if (event.childEvents?.length > 0) {
    const firstEventStatus = eventStatus(event.childEvents[0]);
    let childrenShareStatus = true;

    for (let i = 0; i < event.childEvents.length; i++) {
      if (eventStatus(event.childEvents[i]) !== firstEventStatus) {
        childrenShareStatus = false;
        break;
      }
    }

    if (childrenShareStatus) status = firstEventStatus;
  }

  return status;
}


// ------------------
// EVENT TIME METHODS
// ------------------

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getAmPmHours = (date) => {
  if (!date) return;

  let hrs = date.getHours(),
      mins = date.getMinutes();

  const amPm = hrs >= 12 ? 'pm' : 'am';

  hrs = hrs % 12;
  hrs = hrs ? hrs : 12; // "0" becomes "12"
  mins = mins < 10 ? `0${mins}` : mins;

  const timeStr = mins > 0 ? `${hrs}:${mins}` : `${hrs}`;

  return [timeStr, amPm];
}

// Get a date object from a string, and ignore timezones.
// Contentful sometimes stores timezones. Ignore them, and create
// a date after removing the timezone from the string.
const parseDateString = (dStr) => {
  let noTimezoneString = dStr;
  // Remove the timezone if it is contained
  if (noTimezoneString.includes('Z')) {
    const parts = noTimezoneString.split('T');
    const datePart = parts[0];
    const timePart = parts[1].split('.')[0].slice(0, 5);
    noTimezoneString = `${datePart}T${timePart}`;
  }

  return new Date(noTimezoneString);
}

const eventTimeToString = (time) => {
  const s = parseDateString(time.startDate),
        e = parseDateString(time.endDate);

  // AmPm method returns array with the time text at 0 and "am" or "pm" at 1.
  const startAmPm = getAmPmHours(s),
        endAmPm = getAmPmHours(e);
  // Only add am/pm to both if the time starts in the am and ends in the pm
  const hours = startAmPm[1] === endAmPm[1]
                ? `${startAmPm[0]}-${endAmPm[0]}${endAmPm[1]}`
                : `${startAmPm[0]}${startAmPm[1]}-${endAmPm[0]}${endAmPm[1]}`;

  // If starting and ending on same day, show only one date. Else, show both,
  // and only show the months on both if the months are different.
  const sDate = s.getDate(),
        eDate = e.getDate();

  const days = (sDate === eDate)
                ? `${weekdays[s.getDay()]} ${sDate} ${months[s.getMonth()]}`
                : s.getMonth() === e.getMonth()
                ? `${weekdays[s.getDay()]} ${sDate} - ${weekdays[e.getDay()]} ${eDate} ${months[e.getMonth()]}`
                : `${weekdays[s.getDay()]} ${sDate} ${months[s.getMonth()]} - ${weekdays[e.getDay()]} ${eDate} ${months[e.getMonth()]}`;

  return `${hours} ${days}`;
}

// Generate a string to show the time of a singular event time.
export function timeString(time) {
  if (!time) return;

  let timeStr = null;

  if (time.fullFestivalDuration) timeStr = 'Any time during the festival';
  else if (time.startDate && time.endDate) {
    timeStr = eventTimeToString(time);
  }
  else {
    if (!time.startDate) console.warn('EVENT HAS NO START DATE');
    else console.warn('EVENT HAS NO END DATE');
  }

  return timeStr;
}


// ---------------------
// EVENT BOOKING METHODS
// ---------------------

// Return true if any event time, or any event child's time,
// requires a booking
export function getBookingsRequirement(event) {
  if (!event) return false;
  if (event.times?.length === 0 && event.childEvents?.length === 0) return false;

  for (let i = 0; i < event.times?.length; i++) {
    if (event.times[i].bookingRequired) return true;
  }

  for (let i = 0; i < event.childEvents?.length; i++) {
    const childEvent = event.childEvents[i];
    for (let j = 0; j < childEvent.times?.length; j++) {
      if (childEvent.times[j]?.bookingRequired) return true;
    }
  }

  return false;
}


// ------------------
// EVENT COST METHODS
// ------------------

// Default varied costs string
const variedCostStr = 'Costs vary';

// Return the cost itself if its of reasonable length, otherwise
// return default varied cost string
const getCostText = (eventTime) => {
  if (!eventTime) return variedCostStr;
  return eventTime.cost?.length <= 10 ? eventTime.cost : variedCostStr;
}

// Check event times and then child event times.
// If any require cost, return 'cost'. If not, then
// check if any are 'koha'. Else, return 'free'.
export function getCostOption(event) {
  if (!event) return null;
  if (event.times?.length === 0 && event.childEvents?.length === 0) return null;

  let includesKoha = false;
  let includesFree = false;
  let costsList = [];

  for (let i = 0; i < event.times?.length; i++) {
    const costOption = event.times[i].costOption;
    if (costOption === 'Requires Payment') costsList.push(getCostText(event.times[i]));
    else if (costOption === 'Koha') includesKoha = true;
    else if (costOption === 'Free') includesFree = true;
  }

  for (let i = 0; i < event.childEvents?.length; i++) {
    const childEvent = event.childEvents[i];
    for (let j = 0; j < childEvent.times?.length; j++) {
      const costOption = childEvent.times[j].costOption;
      if (costOption === 'Requires Payment') costsList.push(getCostText(childEvent.times[j]));
      else if (costOption === 'Koha') includesKoha = true;
      else if (costOption === 'Free') includesFree = true;
    }
  }
  // If one cost is given, return it. If multiple are, return varied cost string.
  if (costsList.length > 0) {
    // Check entries to see if they're identical
    if (costsList.every((v, i, arr) => v === arr[0]) === false) return variedCostStr;
    if (includesKoha || includesFree) return variedCostStr;

    return costsList[0];
  }
  // Otherwise, return Koha, Free, or null
  return includesKoha
         ? 'Koha'
         : includesFree
         ? 'Free'
         : null;
}
