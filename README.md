# Pugs Caretaker Game
Pugs caretaker game is a web application where you are supplied an initial set of four pugs (a breed of dog) that you need to feed and walk regularly or they will become unhealthy and die. You can also add more pugs to manage. It accesses Unsplash API through REST calls to retrieve random images of pugs.

It is a responsive design that displays the pug cards (a pug card is a pug image accompanied by some metadata and feed/walk buttons) laid out in a grid, initially four across. As you add more pugs, they line up starting in the second row, from the left, directly under the pugs that precede them.  

As the browser screen size shrinks on smaller devices, the pugs rearrange themselves -- from four across to three, two, and finally settle in one vertical column on mobile devices.

## Try It Out!
Launch https://pure-everglades-60258.herokuapp.com/ ** in your web browser. Please allow a minute or two. I am hosting it in a free tier cloud service and the app is "put to sleep" when not in active use. 

**In case you are unfamiliar with Heroku, they assign ridiculous subdomains to each project when you are using a free account as I am. This is where "pure-everglades-60258" comes from.

## How to Play

### First Steps
You will initially be greeted at the landing page. Click the "Let's Go" link to begin the game. 

Four pug cards will be loaded, each one including a photo, name, temperament, weight (in the 13-20 pound range), along with two buttons labeled FEED ME and WALK ME. That is where YOU come in. Each time you feed the pug, it gains a half pound. Each time you walk the pug, it loses a quarter pound. Be careful about playing favorites because a pug can become unhealthy and die from neglect.

### Unhealthy Pugs
The safe weight range for a pug is between 10-20 pounds inclusive. There are three situations that cause a pug to become unhealthy (and which trigger a "countdown to death" timer):
* **Pug's weight exceeds 20 pounds.** The pug's temperament becomes "Sedentary" and at some point the pug may die from lack of health, spending its days just watching TV on the couch and surfing the web, unless you start walking the pug to bring its weight down to 20 pounds or below.
* **Pug's weight drops below 10 pounds.** The pug's temperament becomes "Malnourished" and the pug will perish due to malnutrition if not addressed within a short period of time by feeding the pug.
* **Pug's weight is in the safe range and it is normally active, but it hasn't been walked or fed in quite awhile.** Its temperament becomes "Neglected" and the pug's days are numbered if not immediately taken for a walk or given a meal.

### Don't Let Your Pugs Die!
When a pug initially becomes unhealthy, its temperament changes to one of the three values specified above -- Sedentary, Malnourished, or Neglected -- and the styling of its temperament is depicted with red text and a frowning face icon. You, as caretaker, will see this change in pug status and have time to act. If you don't you will be notified when the countdown-to-death timer has reached the final seconds: "dead in 10, 9, 8, ..." If you still do not feed or walk the pug (as required to restore pug's health) and the countdown reaches zero, the pug will fade out and disappear permanently (well, by permanently, I just mean for the duration of the current game).

### Adopt More Pugs!
While the game always starts you off with the same set of four initial pugs (though their images change with each new game), you have the option to add more. Just click the round purple + icon that is floating in the bottom right corner of your viewport.

This will lead you to a form where you can fill out the criteria for the pug you are seeking to adopt. You want to give your new pug a name, temperament, and weight. Click NEXT and you will arrive at a screen to review your data entries. Click the BACK button to make changes or ADD PUG to submit your request. The system will automatically match you up with just the right pug at your desired weight and temperament who most resembles the name you have assigned.

You will be returned to the pugs screen where the newest pug will be added along with the earlier pugs that were still alive at the time you went off to fill out the form.

Any pugs that were unhealthy at the time you left to fill out the form will be rejuvenated to see a new pug added to the mix and this will result in resetting their countdown timers to start from the beginning.

## Design

I coded the solution with React and Redux. The source code is organized under the **front-end/src** folder except for utilities (package.json, package-lock.json, .gitignore, and *this* README.md file) and contains the following folders:

* **actions** - Action creators used by Redux.
* **api** - Unsplash third party API setup.
* **components** - React components. The **form** subfolder contains components related to the 'add pug' form.
* **config** - API key setup distinguishing development from production. I hide the development API key and do NOT commit that dev.js file to Git, but the production API prod.js file is okay to push to Git because it merely references an environment variable.
* **reducers** - Reducers used by Redux.

There are also the following files at this level:

* **index.js** - Main starting point of the React app which sets up the data layer control establishing Redux for state management and App as the top level component for rendering.
* **pugs.json** - The initial set of data for four pugs.

## Third Party Tools

### Unsplash
I am retrieving the random pug images using a REST GET API provided by Unsplash.com.

### Axios

I opted to use axios for Ajax calls instead of fetch() since I like the way I can set HTTP request headers in axios.

### Materialize + Coolors

I am an engineer (electrical engineer at heart), not a UX/UI designer, so when I need to whip up a proof of concept with a really nice front-end interface, I rely on material designs from Materialize, https://materializecss.com/, and complementary color palettes from Coolors, https://coolors.co/.

## Features
Here is a recap of the unique features I implemented:

### Configurable 
The web app is quite configurable with files kept separate from code for functionality subject to change:

* Countdown timers based on unhealthy state: **front-end/src/reducers/unhealthyStates.js**
* Action creator types: **front-end/src/actions/actionTypes.js**
* Form fields: **front-end/src/components/form/formFields.js**

### Dying Pugs Countdown
A pug within the final ten seconds of life is identified with a visual countdown "dead in 10, 9, 8, ... 0".

### Dead Pugs Fade Out
When an unhealthy pug has reached its point of death, rather than disappear abruptly, it fades out before leaving the screen.

### Dead Pugs Running Count
If you step away from the computer or device on which you are playing this game and return a brief while later, you might be perplexed to see a blank screen. Remember, that even normally active pugs in the safe weight range can die from neglect. 

To confirm this situation has occurred, pugs that have died in your care are tracked. If all of them have died, rather than displaying an empty screen, a message informing you of how many pugs have died in your care will be displayed along with a suggestion that maybe pug adoption is not your best choice of activity!

### Responsive Design
It is a responsive design that displays four pugs on medium to large screens and reduces to three columns, then two, and finally one long vertical column on the smallest devices such as cell phones. 

The pugs are intentionally laid out in a grid such that a newly added fifth pug will be positioned in the second row on the left below the first pug in the first row *rather than centered all by itself in the second row* (would not look right).

## Assumptions
The specifications are unclear on some points. Below are the assumptions I made.

* The API to get random pug images, http://pugme.herokuapp.com/random, is just a suggestion and I am free to use any API that can accomplish the same thing.
* There is no lockout period after FEED ME and WALK ME buttons are clicked to settle the pug at a certain weight. Therefore, either button can be pressed repeatedly to alter the pug's weight in dramatic ways, especially as needed quickly if the pug is in the final seconds before death.
* The pug's original on-screen description should change to "Malnourished" when its weight drops below 10 pounds.
* The pug's original on-screen description should change to "Neglected" when it, although in the safe weight range, has been ignored for some time.
* Malnourished pugs (under 10 pounds) can be restored to perfect health and temperament if fed enough to at least reach, if not exceed, 10 pounds.
* Sedentary pugs (over 20 pounds) can be restored to perfect health and temperament if walked enough to drop to, or below, 20 pounds.
* The amount of time it takes for an unhealthy pug to die depends on the type of health issue. A malnourished pug will die faster than a well fed sedentary pug. Extra Credit: A pug in the normal 10-20 pound range will have to be neglected for an extended period of time before it becomes deemed unhealthy and counts down to its death.
* Extra Credit Edge Case 1: If a pug is precisely on the low weight boundary (10 pounds) and becomes unhealthy due to neglect, the longer neglect countdown timer will ensue. If the pug is then walked, its weight will drop below 10 pounds and it will become unhealthy for a different reason - malnutrition. However, the longer neglect timer countdown remains in effect. We won't track historical states of unhealthiness just so we can cause the pug to die sooner.
* Extra Credit Edge Case 2: If a pug is precisely on the high weight boundary (20 pounds) and becomes unhealthy due to neglect, the longer neglect countdown timer will ensue. If the pug is then fed, its weight will increase above 20 pounds and it will become unhealthy for a different reason - sedentary. However, the longer neglect timer countdown remains in effect. We won't track historical states of unhealthiness just so we can cause the pug to die sooner.
* When a countdown-to-death timer is in effect for an unhealthy pug, that timer is cancelled if the caretaker leaves** the pugs screen and that timer is restarted from the beginning when caretaker returns to pugs screen. The presumption is that all pugs are rejuvenated to see the caretaker's return and pep up even more if there is a new pug added to the mix. The unhealthy pugs get a reset, a new lease on life, but it will be short-lived if the caretaker continues to neglect them. [If I did have to resume the timer where it left off, I would store it in pugs state in componentWillUnmount() for the given pug ID, then use that remaining time in componentDidMount() instead of the longer total countdown time.]

**By "leave" I do not mean stepping away from the game momentarily. Instead, I just mean leaving the /pugs route by either clicking the Pugs! logo in header to return to Landing page or by clicking the floating purple + icon to go to the 'add pug' form.

## One More Thing
I intentionally left console logging active so that a person reviewing this application could see how the countdown timers work, what their initial values are (based on the circumstances), how they are reset if a pug is cared for, and how they provide a window of time for the caretaker to take action before being alerted to the final 10 seconds. Just launch your web browser's development tools and go to the **Console** tab to see these messages.


