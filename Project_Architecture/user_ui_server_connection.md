Client Providers

User Provider

- Feeds the global user state to the rest of the code

User Reducer

- React components access and modify the user state with this function
  Corresponding backend routes

POST Routes

    - "/login"
        - Function
            - Log in the user
        - UI Part
            - ui/src/pages/login

    - "/signup"
        - Function
            - Sign up the user
        - UI Part
            - ui/src/pages/signup

    - "/currentuser/update"
        - Function
            - Take the data object from the Yelp api call, convert it into a whole string,
            - call this route and store the string as a field of the user table in the database.
        - Purpose
            - To cut down the number of calls to Yelp, especially after a page refresh when the user dose not mean to fetch new restaurants data from Yelp.
        - UI Part
            - ui/src/hooks/useHydrate (make api calls to MongoDB/MySQL database to get Yelp data)
            - ui/src/hooks/useDetectRefresh
                - check if the user hit the refresh button
            - ui/src/providers/DehydrateProvider
                - provides global store for any front end data for a database entity that needs to be store in the database
            - ui/src/providers/HydrateWrapper
                - a connector between useDetectRefreshHook and useHydrateHook
                - turns the useHydrateHook into a react component that renders nothing but listens for the signal from the useDetectRefresh hook
                - if a page is refreshed call the useHydrateHook to fetch data from the database
            - ui/src/components/BackgroundDispatcher
                - a Listener component for the "shouldHydrate" switch in the
                  "Dehydrate" global store for anything that should be "dehydrated"(offloaded)
                  into the database in case of data loss on page refreshes


    - "/user/restaurant_preference"
        - Function
            - Add a user's "would go again ?" choice at a restaurant when the leave a rating
            - and review at a restaurant store page
        - Purpose
            - Record user review for a restaurant as input data to the Tinder like swipe card
            - feature at the user's profile page

    - "/user/restaurant_preference/update"
        - Function
            - Update a user's preference at a restaurant with their lastest review.
        - Purpose
            - So that the newest data is on top

GET Routes

    - "/currentuser"
        - Function
            - Returns the current user's data from the database. Primarily looking to retrieve the
            - email field
        - Purpose
            - In case the user email is cleared after a page refresh if it was solely stored in
            - the client computer's memory, but their access token has not expired yet.

    - "/currentuser/yelp"
        - Function
            - Fetches the data from the most recent call to the Yelp api by the user.
        - Purpose
            - So that they don't have to call Yelp again when they don't need to. Yelp API
            - call has a daily limit of 500.

    - "/user/restaurant_preference/:email/:restaurantID"
        - Function
            - Fetches all of the reviews the current user left for one restaurant
        - Purpose
            - For displaying on the user's profile

    - "/user/restaurant_preferences/:email"
        - Function
            - Fetches the current user's recorded preferences for all the restaurants in the
            - database
        - Purpose
            - For displaying on the user's profile
