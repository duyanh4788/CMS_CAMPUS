# CMS CAMPUS NodeJS
The Multi-Campus Management project enables campus managers to create study programs, develop study planners, and register teachers and students. Key features include campus management, study program creation, class scheduling, teacher and student registration, and schedule conflict prevention.

## Quick Install

1.  Make sure that you have Node.js >=v18 and npm v8 or above installed.
2.  Clone this repo using `git@github.com:duyanh4788/CMS_CAMPUS.git`
3.  Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.<br />
4.  checkout branch develop and development
5.  Copy file `example.env.dev` to `.env` or contact with team
6.  Run `npm run install & yarn install` in order to install dependencies.<br />
7.  Run `npm run env-dev for develop or using pm2 with config into package.json` in order to install dependencies.<br />
    _At this point you can see the example app at `http://localhost:8000`._
    Now you're ready to rumble!

- You can run with docker or docker-compose

1. Copy file `.env.docker` to `.env`
2. Run `$ docker-compose build`
3. Run `$ docker-compose up`
