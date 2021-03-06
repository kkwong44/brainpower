# BrainPower ![Logo](readme/images/logo-small.png)
Click [here](https://kkwong44.github.io/brainpower/index.html) to access live site.

This project was completed, published and shared in Github.

*Screenshot - Mockup on BrainPower Website, generated from [Multi Device Website Mockup Generator](https://techsini.com/multi-mockup/index.php)*

![Screenshot on Mockup](readme/images/mockup.png)
___

## Objectives

BrainPower is a site provides games to test the strength of human brain. It can use to train and improve the player's brain performance.

The target audients will be players that wish to test, train and improve their brain performance.

The initial project of this site is to create a game to test the player's memory. As the site evolve, additional games can be added to test varies part of the brain.

### Business Goals
* Develop games that can test the brain performance
* Allow players to train their brain
* Making the game enjoyable to play

### User Goals
* Test their performance
* Challenge themself to improve their performance

___

## User Experience Design

### Initial Design
Based on the objectives, a game is to be developed to test the player's memory by asking the player to memorise and submit a random number that was shown on the screen. Wireframe was used to create the initial design of the game. The following are the basic structure and functions that will be used to run the game.

*Wireframe - Game Page*

![Wireframe on Game Page](readme/images/wireframe-game.jpg)

*Basic Structure and Functions for The Memory Game*

![Basic Structure and Functions](readme/images/site-structure-and-functions.jpg)

From the initial design it shows that the site can be broken down to the following areas.

1. Common Components section (Header and Footer)
2. Access to Instruction
3. Game Title
4. Game Area

### *Common Components*
The following list is the common components that can be used across the website:
* All pages contain a logo "BrainPower" and an image logo on the left of the header
* A button to access to the game's instruction is located on the right of the header
* All Pages contain a footer. It has 2 sections, Contact us with an email link and links to Find us on Social Media
* When the email link is clicked. Local email client will be opened with an address to BrainPower, UK
* Each social media link will be opened in a new window when its clicked

### *Access to Instruction*
Each game can have its own instruction and can be accessed by clicking on the instruction button. A message box with instruction will display and sit on top of the page.

### *Game Title*
For this project there is only one game and the title for this game is "Numbers Memory Game".

### *Game Area*
For this project there is only one game and the layout in the game area is for the "Numbers Memory Game".

### Additional Designs
* During the development it was decided that a home page should be added for the "Numbers Memory Game". This page provides information and instruction to the game. A link from the header and a button at the bottom of the game area allow the player to access the game page.

* A menu bar for site navigation was also added to the site at the end of the development.

*Screenshot - Homepage*

![Homepage](readme/screenshots/homepage.png)

*Screenshot - Menu Bar (Collapsed)*

![Homepage](readme/screenshots/header-menu-bar.png)

*Screenshot - Menu Bar (Expanded)*

![Homepage](readme/screenshots/header-menu-items.png)

### Final Design

The final design has altered the basic structure to cater the additional designs and the list of functions has expanded from the basic list by breaking it down into further smaller functions.

### Responsive and Accessibility
The website has been developed to be used by as many users as possible and as many devices as possible.

* The site is aim to run on all devices
* Accessibility has been incorporated into the design

Chrome developer tools were used to achieved the above. It enables to see the site responsive to different devices and shows where it can improve accessibilities.
___

## Features

### Header
All pages have the same header format. This section allow user to navigate the site.

On the left there is a menu icon that can be expanded and use for navigate between pages. The company name and its image logo are next to the menu icon. On the right there is a button like feature to navigate to different part of the site.

Features on this section:
* Menu to navigate between pages
* Company Name on the left as part of the logo
* An image of the logo next to the company name
* Both company name and logo will redirect to the home page when these are clicked by the user
* A button like element on the right will change its background color when hover over this element and restore its original color when hover is removed
* For home page, the link is to direct to the Game Page
* For game page, the link is to access the instruction modal box

*Screenshot - Header on Home Page*

![Screenshot on Home Page Header](readme/screenshots/header-homepage.png)

*Screenshot - Header with Menu List on Home Page*

![Screenshot on Home Page Header](readme/screenshots/header-home-menu.png)

*Screenshot - Header on Game Page*

![Screenshot on Home Page Header](readme/screenshots/header-gamepage.png)

*Screenshot - Header with Menu List on Game Page*

![Screenshot on Home Page Header](readme/screenshots/header-game-menu.png)

#### Responsive
User can access to site via different devices.

The site is designed to response and give the best display on different screen width.

* When the screen width is below 768px, Play Game button is hidden
* When the screen width is below 768px, Instruction button on game page move below the menu list

*Screenshot - Header on home page for small width devices*

![Screenshot on Home Page Header](readme/screenshots/header-homepage-small.png)

*Screenshot - Header with Menu List on home page for small width devices*

![Screenshot on Home Page Header](readme/screenshots/header-home-menu-small.png)

*Screenshot - Header on game page for small width devices*

![Screenshot on Home Page Header](readme/screenshots/header-gamepage-small.png)

*Screenshot - Header with Menu List on game page for small width devices*

![Screenshot on Home Page Header](readme/screenshots/header-game-menu-small.png)

### Footer
All Pages have the same footer.

The footer section allows the user find out more information about the company.

The layout is separated in 2 sections, company contact details and follows the company in social media.

Features on this section:
* Contact details are on the left with an email link
* Find us on social media on the right
* The email link and the social media icons will be darkened when hover
* Email client will be opened when clicked
* A new window will be opened for each social media when clicked

*Screenshot - Footer for all pages*

![Screenshot on Page Footer](readme/screenshots/footer.png)

#### Responsive
User can access to site via different devices.

The site is designed to response and give the best display on different screen width.

* When the screen width is below 768px, the 2 sections will stack into a column

*Screenshot - Footer contact us section stack on top of find us on section*

![Screenshot on Page Footer](readme/screenshots/footer-small.png)

### Home Page
The description and instruction are listed on this page. Links are provided to access to the game area.

Player can read the description of the game and instruction on how to play the game. System for calculating the score also provided. Player can access to the game are by clicking the "Play Game" button on the header or the button on the bottom of the page. Also, the player can use the menu to navigate to the game page.

Features on this page
* Description, Instruction and Scoring System
* The numbers in description are dynamic and they are from session storage
* Anchor link to the game area from the header
* Button Link to the game area via (Play Game) button
* Menu bar to navigate to the game area

The numbers in description are dynamic is because the site has been designed so that the game can be changed from the beginning of the main JavaScript. For example, change the number of levels in the game.

*Screenshot - Homepage Features*

![Homepage](readme/screenshots/homepage-features.png)

### Game Page
The layout on this page is for the "Numbers Memory Game". It is designed to test the player's memory by asking the player to submit the random number that was briefly shown on the screen. There are 20 levels and the game start with 4 digits number. Difficulties will increase in every 4 levels completed by an extra digit and the game finishes with 8 digits number. Time to memorise the number also increase by 0.5 seconds in every 4 levels completed. The maximum time to complete the game is set to 10 minutes.

Player is expected to complete 20 levels within 10 minutes. For each level a random number will briefly display on the screen then ask the player to submit the same number. Each answer submitted will be checked and verified. The answer either correct and incorrect. Score will be updated accordingly and the player then can proceed to the next level till the end of the game. The final score and time used will be display on the screen. The player can now play a new game to improve their scores.

Features on this page
* The game use Local and Session storages to hold constants and variables.
* Player can access to the game's instruction by clicking the Instruction button located on the header.
* Game's Title
* Game's Area
* Square containers to display the random number
* Square containers to accept player's answer
* A message area
* Level Counter
* Timer
* Score Counter
* Success Rate in percentage and in graphic representation
* Best Score
* Buttons to start a new game, submit the answer and proceed to the next level.
* Game Over Message Box

### *Local and Session storage values*
Both local and session storage are used to run the game. The constants and variables are declared in the beginning of the script "script-index.js" and the values can be changed. For example, increase the number of levels in a game.

**Local Storage**

This game use local storage to store the best score on device. There are 2 variables and default values are set as below. These values will be updated when the score has been beaten. The default values can be reset when local storage has been cleared.

* bestScoreTime = 59:59
* bestScore = 0

**Session Storage**

The session storage is used to store constants and variables for the game. These default values always reset to its original values when the game start. 

Constants
* maxDigit = 8 (maximum number of digits)
* minDigit = 4 (Start the game with minimum number of digits)
* maxLevel= 20 (maximum number of levels)
* gameTimeInMinute = 10 (maximum time game in minutes)
* gameInterval = 4 (Number of levels to change difficulties)
* initialMemoryTime = 1500 (Start the game with 1.5s to memorise the number)

Variables
* numDigits = 4 (number of digit changes according to the difficulties)
* memoryTime = 1500 (time to memorise the number changes according to the difficulties)
* score = 0 (score for the game)
* miniuteTimer = 0 (time in minutes used in the game)
* secondTimer = 0 (time in seconds used in the game)

### *Game's Instruction*
*Screenshot - Game's Instruction Feature*

![Homepage](readme/screenshots/game-instruction.png)

Player clicked on the Instruction and it display on top of the game. Player can close the message box by clicking on the X or anywhere in the shaded area.

### *Game's Title and Area*
*Screenshot - Game's Title and Area*

![Homepage](readme/screenshots/game-play-area.png)

Game's title is on the top and the game's area is in the grey area.

### *Square Containers for the numbers*
*Screenshot - Square Containers to Display Number and Accept Player's Answer*

![Homepage](readme/screenshots/game-number-and-answer.png)

Top row is for the random computer generated number. Bottom row is for player to submit the answer.

*Screenshot - A random number generated by the game*

![Homepage](readme/screenshots/game-01.png)

*Screenshot - The game asks the player to submit the number*

![Homepage](readme/screenshots/game-02.png)

*Screenshot - Player entered an invalid character in the second digit*

![Homepage](readme/screenshots/game-03.png)

*Screenshot - Player submitted the correct number*

![Homepage](readme/screenshots/game-04.png)

*Screenshot - Player submitted a wrong number*

![Homepage](readme/screenshots/game-05.png)

### *Message Area*
*Screenshot - Message Area*

![Homepage](readme/screenshots/game-message-area.png)

Messages can be anyone of the following:
* Click (NEW GAME) to start
* Enter your answer and hit the Submit button
* Hint: Number 0-9 only
* Correct Answer - Click Next to continue
* Wrong Answer - Click Next to continue

### *Game's Status and Buttons*
*Screenshot - Game's Status Area and Buttons*

![Homepage](readme/screenshots/game-action-status-area.png)

The game's status area holds the information about the game and it contains the following:
* Level Counter - Increment by 1 for each completed level.
* Timer - Start as soon as the game start and the game run for maximum 10 minutes.
* Score - Increment by 1 for each correct answer.
* Success Rate - Represent by percentage and bar chart.
* Best Score - This score is store locally and updated when the score has been beaten.
* Button for (NEW GAME) - To start a new game.
* Button for (SUBMIT) - To submit player's answer.
* Button for (NEXT) - To continue to the next level.

During the game only one button will be enabled at a time.

### *Level Counter and Success Rate*
Success Rate is calculated by number of correct answers against the levels completed. The bar chart has 10 bars and each bar is represent as follow:
* 0% (no bar)
* 0% > rate <= 10% (1 bar)
* 10% > rate <= 20% (2 bars)
* 20% > rate <= 30% (3 bars)
* 30% > rate <= 40% (4 bars)
* 44% > rate <= 50% (5 bars)
* 50% > rate <= 60% (6 bars)
* 60% > rate <= 70% (7 bars)
* 70% > rate <= 80% (8 bars)
* 80% > rate <= 90% (9 bars)
* 90% > rate <= 100% (10 bars)

*Screenshots - Samples of Level Counter and Success Rates*

![Homepage](readme/screenshots/game-rate-01.png)
![Homepage](readme/screenshots/game-rate-02.png)
![Homepage](readme/screenshots/game-rate-03.png)
![Homepage](readme/screenshots/game-rate-04.png)
![Homepage](readme/screenshots/game-rate-05.png)
![Homepage](readme/screenshots/game-rate-06.png)
![Homepage](readme/screenshots/game-rate-07.png)
![Homepage](readme/screenshots/game-rate-08.png)
![Homepage](readme/screenshots/game-rate-09.png)
![Homepage](readme/screenshots/game-rate-10.png)

### *Game Over Message Box*
A message box will appear on top of the game when the game is finished. There are 4 possible messages.
* Game Over with Best Score
* Game Over with Equal Score but finished in a quicker time
* Game Over with Score
* Game Over when Timeout

*Screenshot - Game Over with Best Score*

![Homepage](readme/screenshots/game-best-score.png)

*Screenshot - Game Over with Equal Score but finished in a quicker time*

![Homepage](readme/screenshots/game-best-time.png)

*Screenshot - Game Over with Score*

![Homepage](readme/screenshots/game-score.png)

*Screenshot - Game Over when Timeout*

![Homepage](readme/screenshots/game-timeout.png)

___

## Future Features
This site can evolve and more games can be added to the site.

The "Numbers Memory Game" can be extended to test more than 8 digits but the size and layout of the squares need to adjust to cater for the change.

New feature to allow player to select difficulties of the game.

Create player account to store game history.
___

## Testing

**Unit Testing**

Unit testing was used to test individual feature of the game. It tests each feature to ensure the operation is functioning as expected.

Click [here](readme/testing/report-unit-testing.md) for the unit testing report.

**Functional Testing**

The functional testing is to ensure the site and the game is behave as expected.

Click [here](readme/testing/report-functional-testing.md) for the functional testing report.

**Responsive Testing**

The responsive testing is to ensure the site is displaying correctly on all devices. The live site has been tested on PC, tablet and mobile phone.

Click [here](readme/testing/report-responsive-testing.md) for the responsive testing report.

___

## Validator Testing
Validator testing is used to validate codes that are legally written and to identify any possible errors. This can be done by using online automated testing tools to scan through the codes.
The tools used for this project are
* W3C Markup Validation Service to validate HTML - https://validator.w3.org/
* W3C CSS Validation Service to validate CSS - https://jigsaw.w3.org/css-validator/
* JSHint on JavaScript - https://jshint.com/

The code can be copied and paste directly into the validator to perform the test. A report will be generated with the test results where it identified the errors. The validator will show passed when the code is free of error.

### Validation Reports
The following reports show all HTML pages, CSS code and JavaScript have passed the test.

*Home Page - index.html*

![HTML Validation on Home Page](readme/testing/validator-html-index.png)

*Game Page - game.html*

![HTML Validation on Game Page](readme/testing/validator-html-game.png)

*Error 404 Page - 404.html*

![HTML Validation on 404 Page](readme/testing/validator-html-404.png)

*Stylesheet - style.css*

![HTML Validation on Stylesheet](readme/testing/validator-css.png)

*JavaScript - script-index.js*

![JavaScript Validation on Home Page](readme/testing/jshint-homepage.png)

*JavaScript - script-game.js*

![JavaScript Validation on Home Page](readme/testing/jshint-gamepage.png)

___

## Performance and Accessibility Testing
**WAVE Testing Tool**

WAVE is a web accessibility evaluation tool and it is use to help the developer to make their web content more accessible to individuals with disabilities.

This site has been tested by this tool and the overall results are good without errors. There will be instance the tool will report that there are contrast errors but these errors are intentional during the game as the numbers are hidden from the player.

**Lighthouse Testing Tool**

Lighthouse is a tool in Chrome Development Tools that allows developer to test their website. Performance and Accessibility are two of the tests carried out by Lighthouse and it can identify where you can improve the performance and accessibility.

From the lighthouse reports at below, it shows the site perform well. The site was physically tested on several devices from desktops, tablets and mobile phones. The performance on these devices were operated normally and without lagging.

*Lighthouse Report on index page*

![Performance Report Home Page](readme/testing/performance-index.png)

*Lighthouse Report on game page*

![Performance Report game Page](readme/testing/performance-game.png)
___

## Unfixed Bugs
* Currently, the layout of the number squares is designed for up to 8 digits on mobile devices. This is acceptable for current scope as maximum digit is set to 8 but need to refine if changing the scope.
___

## Deployment
### Tools
* GitHub is a code hosting platform for version control and collaboration
* Gitpod is a ready-to-code developer environment

### Development processes

* All the development works are carried out in Gitpod
* Create a repository in Github through Gitpod
* Start the project from a boilerplate written by Code Institute. The full template can be copied from [here](https://github.com/Code-Institute-Org/gitpod-full-template)

    **Repeat the following until project completion**

* Developing your site, save your project in your Gitpod workspaces
* Use git add command to add files to local repository
* Use git commit command to commit the changes to local repository

### Deployment to Github Pages

* Use git push to upload local repository content (Gitpod) to a remote repository (Github)

    **The published site link can be found from your Github repository setting.**

* Select setting from your github repository
* Select Pages on the left hand side menu as shown below
* Under the Source section, you need to select main from Branch in order to publish the site
* You can suspend the published site by selecting none from Branch in the source section

In order to commit any new changes to the live site, always perform git push to upload the latest version of the development code to the remote repository.

*Screenshot - Github Pages*

![Github Pages](readme/images/github-page.png)

The live site for this project is published under [https://kkwong44.github.io/brainpower/](https://kkwong44.github.io/brainpower/)

***You can use GitHub Desktop to clone and fork repositories that exist on GitHub.***

Click [here](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) for more information on Cloning and forking repositories from GitHub Desktop.
___

## Credits
### Content
The basic structure of the pages is based on the Cappadocia Tour project i.e page header and footer. Some JavaScript logics are inspired from the Love Maths project.

The footer icons for the Social Media are from:

* Font Awesome website - [https://fontawesome.com/](https://fontawesome.com/)

Website favicon was generated from:

* favicon - [https://favicon.io/](https://favicon.io/)

The modal box and menu navigation techniques are based on the examples from:

* W3schools - [https://www.w3schools.com/howto/howto_css_modals.asp](https://www.w3schools.com/howto/howto_css_modals.asp)

* W3schools - [https://www.w3schools.com/howto/howto_js_mobile_navbar.asp](https://www.w3schools.com/howto/howto_js_mobile_navbar.asp)

There are number of window objects and DOM events were used in the project. For example, locatStorage(), sessionStorage(), setTimeout(), setInterval(), focusout, mouseover, mouseout etc.

The information and usage for all the above methods were from W3Schools website.

* W3schools - [https://www.w3schools.com](https://www.w3schools.com)

The following websites also used for research and development on objects, events and methods in coding JavaScript.

* MDN Web Docs - [https://developer.mozilla.org/en-US/](https://developer.mozilla.org/en-US/)

* stackoverflow - [https://stackoverflow.com/](https://stackoverflow.com/)


### Media
The images used in this website are from the following:

* The image logo has been edited and from [Pixabay.com](https://pixabay.com/)
___

## Tools
The tools used to carry out the development on this project are:

* Gitpod and Github
* Image editor - Adobe Photoshop
* Chrome Dev Tools
* W3C validators
* JSHint JavaScript Code Analysis Tool
* Webpage Screenshots - Chrome app extension (FireShot)
* WAVE Web Accessibility Evaluation Tool - [https://wave.webaim.org/](https://wave.webaim.org/)

___

## Acknowledgment
I would like to thank the following to support the development of this website.

* Learning Support - [Code Institute](https://codeinstitute.net/)
* Mentoring Support - [Daisy McGirr](https://github.com/Daisy-McG)