
<h1>Chat and Slider with settings</h1>

<b>1. Install</b>

 - clone the repo
 - open a terminal in the created directory root
 - $ npm install
 - $ node server.js
 - $ npm start

  Browser should open. If you would like to try out the chat open the page in an other tab as well.

<b>2. Build for prod</b>
  Serving only one minified JS and CSS file
  npm build => public/static

<b>What it is and how to use?</b>

Please Note:  I assume in the following description you've already opened the application in two
different browser tab at the same time.

<b>General information</b>

  In frontend development I used ReactJs. I used - create-react-app as Facebook -
  with a little config change to serve sass files as well.
  For generating CSS I used compass and React-Router for routing.
  No other additional plugins were used.

  In backend development(MockServer) - see later - I used express on NodeJs.

<b>1.  Chat</b>
  Chat is the index route users arrives here.
  User can send messages to others.

  Features/behaviour:
  1. Send message: write something to the input field (bottom of page) and click
  on Send or hit enter.

  you will see your own message above, without username on the right side.
  in the other browser tab you will see the same message with the username
  in different design on the left side.

  2. Blink chat tab: go to an other Route for instance: Photos in the first bowser window.
  Open the chat tab in an other one. Send message from here.
  Check the the first browser tab. Chat link is blinking until you click on it (chat tab will open).

  3. Change nickname: go to settings tab. Open chat settings. Write a new nickname in the input field.
  Click on save. Go back to chat tab send a message. In the other browser tab
   you can see the sent message with the new nickname.

<b>2. Photos</b>
  In photos tab you can see a carousel.

  Features/behaviour:
  1. Next image: If you click on the the right arrow new image will come. Show loading text during loading.

  2. Previous image: if you click on the left arrow the previous image will come if there are any.

  3. Change settings: if you would like to set the resolution of the the image go to settings -> PhotoSettings

  Set different values and go back to Photos to check the resolution of the images.

  4. it should work with swipe gestures as well.

    in Chrome: devTools -> more tools -> Sensors tab -> Find 'touch'  field at the bottom -> set to Force enabled
    Make swipe gestures with your mouse over the carousel image.

<b>3. Settings</b>
    Features/behaviour:
     1. Two accordions here: ChatSettings and PhotoSettings
     If you click on accordion title the detail part of accordion will open and close.
     2. Change different Settings: You can set your nickname for the chat and the resolution of your photos here. As you already seen in the previous tabs.

<b>Some Other thing:</b>

 <b>App strucure:</b>

     FE:
     application
       index.js is the root element were react initalize;
       App.js the central place of the application. Responsible
       for routing and maintaing application state
       contianers and components for React components
       styles for every style related file (sass, css, fonts currently)

     BE:
      server.js  for handling http request and socket connection
      static folder: for serving images to the FE
      webpack config use this server port as a proxy server (package.json)


  <b>Style:</b>
    The page is fully responsive. Every component and container component has own sass file as react principles said.
    It is a bit different approach from sass and compass. But I tried to handle them together.
    Considerable approach was to add only screen.css to the react root and import all of needed css in that file. But the followed structure seems to be more handy with during development.

  Structure:
      React components load styles from the stylesheets folder.
      There are the compass generetated css files.

      Base variables can be found: base.scss and base.css
      Shared mixins location: mixins.scss and mixins.css

      Style Developing process:
        -You need to edit only the sass files then compile to css automatically with:
         $ compass compile  Check for changes: $ compass watch

        -You can import sass files directly into react components.
        in this case:
          -npm eject
          -replace webpack.config.dev.js in config folder to
          webpack.config.dev.js located in the root directory.
          It adds sass loader to webpack.

<b>Important notes:</b>
  - Socket.io: I tried to reach your server. It said: 'Welcome to sicket.io' but
  I had no socket connection with it. I tried with different Socket.io testers and my own application as well. I tried with Socket.o version 0.9 and with latest too.
  Handling this issue I mocked out the socket server (just for simplification the latest) in server.js.

  - Photos: I loaded images from lorempixel.com.
  To handle to show the previous image in the browser
  I needed to cache the images, because there are new images on every request as I saw.
  It is possible by saving the img blob or a base64 encoded object on image load as I know.

  But from security reasons it arise CORS issues in localhost and http.
  I was not sure, what do you think about localhost CORS issues.
  My application should handle it or not. I assumed it is a requirement to handle.

  That's why I made to different solution here.
  1. I wrote a node server as a middleware (server.js) it downloads the images
  and serve this newly created 'in-house url' to the client.
  In this case I can fully controll this issues.

  2. In the case you are not interested in the server side solution:
  Please check my ./src/containers/Photos-client.js file.
   Please note: it is just to demonstrate a client img loading and chaching for one image.


<b>Development plan of the application:</b>

      - Unit tests!
      - make more mixins in sass file, where possible
      - in a case of more complex application introduce Redux to manage application
      states.
      - more compex error handling (for instance: socket and other requests errors)
      - make different design in mobile and desktop view.
      For a more sofisticated layout introduce media queries.
      - introduce more abstract components to make the components more reusable
      (for instance Form components for all form handling.).
