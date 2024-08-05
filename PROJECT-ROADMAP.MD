# GDSC Open Source Project Planning & Documentation Template

## Table of Contents

- [:bulb: Project Description](#-bulb--project-description)
- [:compass: Implementation Plan](#-compass--implementation-plan)
- [:clipboard: Team Management](#-clipboard--team-management)
- [:athletic_shoe: Sprint Planning](#-athletic-shoe--sprint-planning)

## :bulb: Project Description

### Functional Requirements

The user should be able to:

1. Create an account and login
2. Generate a new journal entry
3. Enter markdown into a WYSIWYG editor
4. Ppen and review previous entries
5. Create entries based on prompts provided by AI
6. Ask and discuss topics with the AI pal
7. Track their hourly mood which is graphed for the user

### Non-functional Requirements

1. The app should be built using a mobile first design and deployed as a PWA
2. The app should use a CICD pipeline to deploy once a pull request is merged to the production branch
3. The app should have atleast a 65% jest code coverage
4. The app should limit AI API usage to a maximum of ### credits per day

### Stakeholders

- Individuals seeking mental health support
- Individuals looking to improve self awareness
- Individuals looking to track mood
- Therapists and mental health professionals

## :compass: Implementation Plan

### Project Timeline

- **Milestone 1 (MVP):** SPA Single User WYSIWYG editor
- **Milestone 2:** Application Infrastructure
- **Milestone 3:** Deployment and Testing Infrastructure
- **Milestone 4:** Feature expansion

### Tech Stack

This stack is not set in stone and will almost definitely change based on discussions we have together as a team and changing requirements. Ideally we have a mixture of familiarity, ease of use, and popular/essential resume technologies. You also don't have to know these technologies, but any knowledge or familiarity helps. Many people learn all these technologies on the spot and they are great to put on your resume.

- **Frontend Framework:** React.js, Next.js
- **Frontend Libraries:** Tailwind, Shadcn, React Query, React Hook Form
- **Backend Framework:** Express.js
- **Database:** MySQL
- **Other Technologies/Libraries:**
  - TypeScript
  - Passport.js
  - CICD: Docker, Kubernetes, Terraform
  - Testing: Jest, cypress, swagger, postman
  - GCP Natural Language AI, GCP Dialogflow

### Project Structure

[Folder Structure Eraser.io Documentation](https://app.eraser.io/workspace/JoXHCjQBm70h8NeR50ze?origin=share)

### API Documentation

[API Eraser.io Documentation](https://app.eraser.io/workspace/zb0jgyKz26oaJPe96JoZ?origin=share)

### Testing & CI/CD

[Testing & CI/CD Plan Eraser.io Documentation](https://app.eraser.io/workspace/REldmOGaxXlQqWZVVQb0?origin=share)

### Hosting

[Hosting and Deployment Eraser.io Documentation](https://app.eraser.io/workspace/tA3cpgURfOfrJfOkImal?origin=share)

## :clipboard: Team Management

### Team Members

- **Scrum Master & Product Owner:** Abed
- **Frontend and UI Developers:**
  - [Name]
  - [Name]
  - [Name]
- **Backend Developers:**
  - [Name]
  - [Name]
- **CICD Developers:**
  - [Name]
  - [Name]
- **QA Developers:**
  - [Name]
- **AI Developers:**
  - [Name]

### Team Communication

- **Communication Platform:** Discord
- **Meeting Schedule:**
  - Sprint Review: Weekly (45 minutes, decided on by team)
  - Sprint Retrospective: (15 minutes after review)
  - Other Meetings: Meetings between members and groups should be scheduled and conducted based on the needs of the team

### Roles and Responsibilities

- **Scrum Master:**
  - Flush out project's boilerplate
  - Assign tickets to developers
  - Facilitate scrum ceremonies (sprint reviews, retrospectives)
  - Remove impediments
- **Product Owner:**
  - Define product backlog
  - Prioritize user stories
  - Accept/reject deliverables
- **Developers:**
  - Develop features through ticket completion
  - Create test cases to for feature/ticket acceptance
  - Thoroughly document code and features through pull requests and README docs
  - Execute tests
  - Report defects

### Collaboration Tools

- **Github Issues**: ticket management
- **Eraser.io**: infrastructure and design documentation/guides go here
- **Read Me's**: code/api/component related documentation

### Code Acceptance: The Definition of Done

Below we define the Definition of Done for this project, i.e. what needs to the included in a pull request for the pull request to be accepted by the Product Owner:

- Code Complete (satisfies feature associated to the ticket)
- Passed Code Review by Scrum Master
- Passed Unit Tests/Other testing developed for the feature
- Documentation Updated
- Ready to be integrated with Main Branch (no merge conflicts)

## :athletic_shoe: Sprint Planning

### High Level Goals for Each Sprint

#### <u>Milestone 1</u>

MVP of the application is to be an SPA with a single user, no authentication yet. We should be able to create and delete entries and establish a websocket to edit a journal entry inside of an WYSIWYG editor.

**Sprint 1**:

- NextJS, ExpressJS, MySQL initialization
- GET, POST, and DELETE endpoints for journal entries
- Research tools and update documentation and design

**Sprint 2-3**:

- Create a websocket for editing journals
- Implement a user friendly WYSIWYG

#### <u>Milestone 2</u>

This milestone is concerned with taking our MVP and implementing proper folder structure, authentication, middleware, proper routing, and creating a solid foundation for our project

**Sprint 4-5**:

- [Setup passport JS](https://www.youtube.com/watch?v=WYHQP9lQgD8)
- Design and develop proper authentication flow
- Build authenticated and protected routes

**Sprint 6**:

- Keep fleshing out feature such as the individual pages and components

#### <u>Milestone 3</u>

The purpose of this milestone is to create proper infrastructure for building, deploying, and testing this application

**Sprint 7-10**:

- Dockerize the application
- Create terraform scripts
- Host the application on GKE
- Build a CICD pipeline
- Create testing pipeline

#### <u>Milestone 4</u>

The purpose of this milestone is to polish the application and add more features

**Sprint 11+**:

- Fix bugs and refactor code
- Update UI and design and implement changes
- Add any further features
