// Constants that we set for unhealthy pug states to avoid hardcoding them in pugsReducer.js and PugCard.js files.
// Although any unhealthy pug can be considered neglected, the NEGLECTED constants refer to a pug in the 10-20 pound
// range who would normally be considered healthy, but after a longer period of inactivity, has become unhealthy.

// Numbers below are in pounds.
export const UNDERWEIGHT_WEIGHT_THRESHOLD = 10;    // When pug's weight drops to this amount, its status is malnourished. 
export const OVERWEIGHT_WEIGHT_THRESHOLD = 20;     // When pug's weight rises to this amount, its status is sedentary.

export const UNDERWEIGHT_TEMPERAMENT = 'Malnourished';
export const OVERWEIGHT_TEMPERAMENT = 'Sedentary';
export const NEGLECTED_TEMPERAMENT = 'Neglected';

// Numbers below are in seconds.
// o Countdown total is complete amount of time pug can remain unhealthy before death ensues.
// o Countdown threshold is when we start notifying caretaker with a visible countdown timer on-screen.
//   [When pug initially crosses over into an unhealthy status, we give caretaker time to take action.]
export const UNDERWEIGHT_COUNTDOWN_TOTAL = 20;
export const UNDERWEIGHT_COUNTDOWN_THRESHOLD = 10;
export const OVERWEIGHT_COUNTDOWN_TOTAL = 25;
export const OVERWEIGHT_COUNTDOWN_THRESHOLD = 10;
export const NEGLECTED_COUNTDOWN_TOTAL = 30;
export const NEGLECTED_COUNTDOWN_THRESHOLD = 10;

// In seconds, timer for measuring pug's active existence before neglect sets in.
export const ACTIVE_COUNTDOWN_TOTAL = 30;