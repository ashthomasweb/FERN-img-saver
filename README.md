# FERN Architecture 1

Firebase Realtime Database
Mongoose
Node
Express
Axios
React 
-react-router-dom v6

New app needs new API key from image provider.

Simply create an account and an app with Unsplash.com, and find your API key in the settings for your newly created app.

Just copy and paste that key into a .env file, or your live production environment variable panel, named UNSPLASH_API_KEY.

Good to go.

Architectural template with all operations on single page.

Makes use of conditional rendering to create multi-pane display.

HOC wrapper provides params.

Custom Hooks make axios requests with useEffect to replace lifecycle method.

Reducer and Context provided in <MainState /> component wrapper.

Server redirects to 'getAll' route with custom message handler.
