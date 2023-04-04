<div align="center">
By:
<a href="https://www.linkedin.com/in/yaozguan/">Yao Guan</a> |
<a href="https://www.linkedin.com/in/miro-malebranche/">Miro Malebranche</a> |
<a href="https://www.linkedin.com/in/tasneem-patrawala/">Tasneem Patrawala</a> |
<a href="https://www.linkedin.com/in/cshemerda/">Chance Hemerda</a>
   <img src="https://i.imgur.com/vad5L2s.png" alt="logo" width="10%" height="10%" />
  <h1>Welcome to Fat Stack!</h1>
  
  <p>
        A personal finance app that helps track your Accounts, Transactions, Budgets, Trends, and Goals all in one place.
  </p>
   
<h4>
    <a href="https://fat-stack.onrender.com/"> View Demo </a>
  <span> · </span>
    <a href="https://github.com/2212-tyrannosuarus/capstone"> Code </a>
  </h4>
</div>

<br />

<!-- About the Project -->

## :star2: About the Project

<!-- Screenshots -->

### :camera: Screenshots

<div> 
  <img src="https://i.imgur.com/KWG4Kan.png alt="homepage screenshot" width="700" height="auto"" />
</div>

<!-- TechStack -->

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://chakra-ui.com/">Chakra UI</a></li>
    <li><a href="https://redux.js.org/">Redux</a></li>
    <li><a href="https://apexcharts.com/">Apex Charts</a></li>
    <li><a href="https://formidable.com/open-source/victory/docs/victory-chart/">Victory Charts</a></li>
  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
    <li><a href="https://nodejs.org/en">Node</a></li>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://plaid.com/docs/api/">Plaid</a></li>    
    <li><a href="https://openai.com/">OpenAI</a></li>
  </ul>
</details>

<details>
<summary>Database</summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
    <li><a href="https://sequelize.org/">Sequelize</a></li>
  </ul>
</details>

<!-- Features -->

### :dart: Features

- Create budgets and goals! 🥅
- Manage, create, delete, and add notes to transactions! 🗃️
- Check out useful views of your financial information! 📈
- Monitor trends in spending and income! 💸

<!-- Run Locally -->

---

## :running: Run Locally

### .env File

To run this project, you will need to add the following environment variables to your .env file

```
  JWT=yoursecrethere
```

You will need to configure the following API variables locally:

```
  PLAID_CLIENT_ID
  PLAID_SECRET
  OPENAI
```

### Database Info:

For the program to function on your local machine, create a postgresql database named "capstone".

<details><summary>More Database Details</summary>
In the absence of a DATABASE_URL variable defined in the .env file, the program will connect to the database defined at the following string:

```
postgres://localhost:5432/${databaseName}
```

Here, databaseName is defined as the "name" property from the package.json file. The name of our project is "capstone" as is the name of the database we used for the project.

</details>

---

### Run these commands in the terminal to get started:

```bash
  git clone https://github.com/2212-tyrannosuarus/capstone.git
  cd my-project
  npm install
  npm run start:dev
```

<!-- Contact -->

## :handshake: Contact

<a href="https://www.linkedin.com/in/yaozguan/">Yao Guan</a> |
<a href="https://www.linkedin.com/in/miro-malebranche/">Miro Malebranche</a> |
<a href="https://www.linkedin.com/in/tasneem-patrawala/">Tasneem Patrawala</a> |
<a href="https://www.linkedin.com/in/cshemerda/">Chance Hemerda</a>
