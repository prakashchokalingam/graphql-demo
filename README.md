# graphql-demo

Simple todo app using graphql with Node JS, Vue JS as client and Mongodb as storage.

# Initiating servers

1. Install all the dependences using the command `npm install`

2. Start the simple graphql server using `node index`. (make sure mongodb is running with a collection called todos)
  
   Reach the graphiql with : http://localhost:4005/graphql

3. To start the apollo graphql server with Subscription - websocket implementation use `node apollo`

    Reach the apollo playground with: http://localhost:4006/graphql with the subscription endpoint ws://localhost:4006/subscriptions

4. Start the client by,

   * Navigating to the client directory `cd client` and install dependencies using `npm install`
   * Start webpack-dev-server using `npm start`
   * Reach the client app with : http://localhost:8080 (has subscription for new todo's)

