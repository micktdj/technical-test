# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug :

- Sign up to the app
- Create at least 2 others users on people page ( not with signup )
- Edit these profiles and add aditional information
- Create a project
- Input some information about the project
- Input some activities to track your work in the good project

Then, see what happens in the app and fix the bug you found doing that.

## Then

Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

### What bugs did you find ? How did you solve these and why ?

1. Fix bug on the "Update user" form to be able to submit the form.
2. Fix bug on the "Update user" form to be able to update the user "name" field.
3. Fix bug on "View List User" to be able to find user with the search bar.
4. Refact `api/src/controllers/project.js:/:id ROUTE` to return a unique object instead of an array with a single entry.
5. Refact/Improve UX `app/src/scenes/project/list.js` to refresh state after `POST /project api call`.
6. Refact/Improve UX `app/src/scenes/project/view.js` infinite loading on undefined project url like `/project/undefined`.
7. Fix bug on "Edit Project" form to be able to update the user "name" field.
8. Refact `api/src/auth.js:64` : `null` value must be a non-valid value for a password, we have to return a 400 in this case. Also, the password (hash) was returned in the response payload, I removed it for security reasons.
9. Fix/Refact model `User` : "name" must be required in User Schema because the value is used as a "username/credentials" for Authentication feature.
10. Refact/Fix Security check on `validatePassword` method to be more resilient in case of `undefined/null/empty string` value.
11. Fix/Refact model `User` remove unique index on `organisation` field and add a unique index on `{name: 1, organisation: 1}` : The schema was inconsistent because you can have several users in the same organization but not the same user/name in the same organization.
12. Refact : Improve `api/src/models/user.js` sanitization to lowercase/trim `name` and `organisation` field before insert.
13. Fix form bug on `app/src/scenes/user/list.js` : rename `username` to `name` field to send the right payload on api call.
14. Refact/fix schema inconsistency on project model : `name` must be a required field.
15. Improve UX response on `app/src/scenes/project/list.js` when the name is invalid during project create form.

### Which feature did you develop and why ?

#### Logger feature for MongoDB database index creation

We know that the `unique` field on Mongoose schemas does not represent validation rather, it simply creates a unique index on the collection of the respective schema.

There was an issue with the default MongoDB database URL provided in the application for the technical test. The indexes were not present on the collections, allowing, for example, the creation of multiple users with the same username/name, which is critical for the authentication feature.

Mongoose is supposed to create indexes upon startup, but it was unable to do so because there were already non-unique duplicates present in the collection. This error was critical for data schema coherence and consistency, and Mongoose did not return any errors regarding the failed index creation upon startup.

Therefore, I added a logging feature to provide feedback on index creations potentially failing at the application's startup.

#### Environment Variable Management Refactor

In the proposed project, there was an un-gitignored .env file that was not being used.

I refactored the management of environment variables in the project to have a cleaner management and stricter validation of environment variables using the `envalid` library.

Additionally, I added `dotenv` to load the .env file at the startup of the application.

I did this without modifying the base export of the `config.js` file to abstract this new behavior and achieve a quick win without refactoring all the files.

#### Quick Win Feature: Save as PDF

I added a quick win feature to quickly add value to the project and increase client interest for selling the project.

I'm using the `html2canvas` library combined with the `jspdf` library to add a "Save as PDF" button on the project detail page.

This allows the user to save project details as a PDF with a single click, making it easy to archive or share.

### Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ?

#### Benefits of TypeScript for Backend Development

Integrating TypeScript into our Express API, currently written entirely in JavaScript, would bring numerous advantages. TypeScript adds static typing features to JavaScript, enabling early detection and correction of errors during development.

By using TypeScript for our controllers and models, we would benefit from better type checking, making our code more robust and less error-prone. Specifying types for input and output parameters of our functions would improve code readability and maintainability.

Additionally, TypeScript provides better IDE support with features like autocompletion and enhanced code navigation.

In summary, adopting TypeScript in our backend would enhance the quality, stability, and maintainability of our code, resulting in a better experience for both developers and end-users.

#### Benefits of Typing Props with TypeScript

Adding TypeScript to our React frontend allows us to type our component props, enhancing code clarity and preventing common errors. By explicitly defining the types of props, we ensure that our components receive the correct data types, reducing bugs and improving code maintainability.

#### Enhancing/Refact React Component Development with Atomic Design and Storybook

Utilizing the `Atomic Design pattern` for React components and integrating `Storybook` provides numerous benefits. Atomic Design helps organize components into reusable building blocks, improving modularity and maintainability. Storybook offers a centralized platform to visually showcase and document component enhancing collaboration.

#### Improving Backend Stability with better Models/Schemas and Yup Validation

Enhancing backend stability involves tightening up schemas/models and implementing stricter validation, especially for incoming requests. By adopting more rigorous schemas/models and using Yup validation in controller inputs, we can better control and validate incoming `req.body` data, reducing errors and ensuring data integrity.

#### Improving Codebase with Unit/Integrations/E2E tests

Improving Frontend/Backend stability with Unit/Integration/E2E tests with framework like Jest/Supertest/Cypress...

#### Enhancing User Experience with Improved Error Feedback

One area requiring attention is the lack of sufficient feedback to users in case of errors on the frontend. Implementing a more robust UX feedback system is essential to ensure users understand errors, especially in form submissions.
