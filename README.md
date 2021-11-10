# roseluu-MVC-tech-blog

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://choosealicense.com/licenses/mit/#)

# Table of Contents

- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)
- [License](#license)
- [Contribution](#contribution)
- [Questions](#questions)

# Deploy link :

[visit page](https://dry-sands-54611.herokuapp.com/)

# Description

This project will build the back-end for E-commerce page. Using sequelize to interact with SQL database.

  <br />

# Installation

User have to install:

- [Node.js](https://nodejs.org/en/download/)
- bcrypt
- connect-session-sequelize
- dotenv
- Sequelize
- Express
- express-handlebars
- express-session
- MySQL2

# Technologies

- JavaScript
- Node.js
- SQL

# Usage

Clone this repo, open terminal (on Mac) or GitBash (on Window), navigate to the file and run command

```
npm i
```

to install npm libraries.

  <br />

Navigate to `db` folder and run mysql to install the database

```
mysql -u root -p
```

after enter your sql password, run

```
source schema.sql
```

to create database. Then exit the database by run:

```
exit
```

  <br />

After that get out to the root level and run the command

```
 node seeds/seed.js
```

to create table and column inside the database
<br />

To start retrieve the data. Run this command:

```
node server.js
```

# License

This project is licensed under the MIT license.

# Contribution

​Contributors:
Rose Luu

# Questions

Please contact if there is any question:

- Github: [RoseLuu](https://github.com/RoseLuu)
- Email: luuhongnhung10@gmail.com
