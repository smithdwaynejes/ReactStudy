npm install express@4.16.4 --save
(module needed to start the Express web application)


npm install cors@2.8.5 --save
(module enable Cross-origin resource sharing)

npm install body-parser@1.18.3 --save
(module that helps to parse incoming request bodies)

npm install dotenv@6.2.0 --save
(module that will load our .env file into process.env variables)

npm install nodemon@1.18.9 --save-dev
(tool that helps automatically restart the application when file changed)

npm install @okta/oidc-middleware@1.0.2 express-session@1.15.6 --save
These two npm modules are for Okta authentication.



OKTA_ORG_URL={yourOktaOrgUrl}
OKTA_CLIENT_ID={yourClientId}
OKTA_CLIENT_SECRET={yourClientSecret}
REDIRECT_URL=http://localhost:3000/authorization-code/callback
RANDOM_SECRET_WORD='super secret'

