## Welcome to Fat Stack!

#### Here are somethings you need to know to use our app:

##### .ENV file

_*#### Database*_
In the absence of a DATABASE_URL variable defined in the .env file, the program will connect to the database defined at the following string: `postgres://localhost:5432/${databaseName}`. Here, databaseName is defined as the "name" property from the package.json file. The name of our project is "capstone" as is the name of the database we used for the project.

For the program to function on your local machine, create a postgresql database named "capstone".

_*API Keys*_

_Plaid API_
The 'Connect Bank Account' button will communicate with Plaid's sandbox to give sample account data without further configuration. If at any point, a developer wanted to work with this project to get actual bank account information from Plaid's API, they would need to contact Plaid to get their own API key.

_OpenAi API_
The 'Goals' tab of this project features inspirational quotes which are provided by Openai's davinci model. (GPT-3) This functionality will not be available unless the user acquires their own Openai API key.
