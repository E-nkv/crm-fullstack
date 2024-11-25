# Monsoft CRM

CRM-fullstack is a customer relationship management system designed to help businesses manage their contacts effectively.

## Project Overview

Monsoft CRM provides an intuitive interface for managing contacts. Users can create, update, and filter contacts, and the application uses an in-memory database for storage.

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm
- TypeScript

## Setup Instructions
0. Navigate to the folder from which you want to clone the repo 

1. Clone the repository:
   ```bash
   git clone https://github.com/E-nkv/crm-fullstack.git

2. Cd into the project
    ```bash
    cd crm-fullstack

3. Install dependencies for the api:
    ```bash
    cd api
    npm install

4. Install dependencies for the client:
    ```bash
    cd client
    npm install

5. Run the api (runs the api at port localhost:8080)
    ```bash
    cd api 
    npm start

6. Run the client (runs the client at localhost:3000. A new browser tab will be opened by default)
    ```bash
    cd client
    npm start


### Project Structure
The api's source code (api/src) has the main.ts as the entry point of the app, the app.module.ts for the NestJS module, and contactsService for our actual code / service. In it, we have the "service" folder, who is responsible for the application layer of the app, as well as "storage", responsible for all of the database layer of the app.

For the client, inside src, we have the main "App" component, and all of the required components used by App are defined in the "components" folder. 

### Technology Stack

#### Frontend:
- **TypeScript**: 4.9.5
- **React**: 18.3.1
- **TailwindCSS**: 3.4.15
- **Radix UI**: 1.1.2

#### Backend
- **TypeScript**: 4.9.5
- **NestJS**: 10.0.0 
- **Drizzle ORM**: 0.36.3 (optional)
- **TypeORM**: 0.3.20 (optional)
