# Contacts Management Application

This is a simple Contacts Management Application built with Angular 17.0.0 and .NET Core 6.0.

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [.NET Core SDK](https://dotnet.microsoft.com/download)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/InterraIT/ChiragContactApp.git
   ```

2. Install npm packages for the Angular app:

   ```bash
   cd contactmanagement
   npm install
   ```

3. Restore NuGet packages for the .NET Core app:

## How to Run the Application

### Angular App

1. Navigate to the `contactmanagement` directory:

   ```bash
   cd contactmanagement
   ```

2. Run the Angular development server:

   ```bash
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200/` to access the Angular app.

### .NET Core App

1. Navigate to the project root directory:

   ```bash
   cd CMSAPI
   ```

2. Run the .NET Core application:

   ```bash
   dotnet run
   ```

3. Open your browser and navigate to `http://localhost:7123/` to access the .NET Core API.

## Design Decisions and Application Structure

### Angular App

Bootstrap 5 Integration: The application leverages Bootstrap 5 to create a responsive and visually appealing layout. The use of Bootstrap ensures a consistent and user-friendly design across different parts of the application, contributing to a seamless user experience.

ng-bootstrap for Enhanced Modals: To implement popups for adding and editing contacts, the application utilizes ng-bootstrap. This Angular-specific library provides Bootstrap components, particularly modals, seamlessly integrated into the Angular framework. This choice enhances the user experience when interacting with contact details.

ngx-toastr for User Confirmation Messages: The application employs ngx-toastr as a service to display user confirmation messages. This library enhances user feedback by providing visually appealing and non-intrusive notifications for various actions within the application.

Reactive Forms with Advanced Validation: The application utilizes Angular's reactive forms to manage user input systematically. Leveraging reactive forms brings powerful features, including built-in validation capabilities. This ensures that user-entered data adheres to specified criteria, resulting in a more streamlined and error-resistant user experience.


### .NET Core App

- The .NET Core app follows a layered architecture with separate folders for controllers, services, Interfaces and models.


Certainly! Optimizing the performance of a .NET Core application involves several considerations.

Use Asynchronous Programming:

Leverage asynchronous programming with async and await to avoid blocking threads and improve scalability. Asynchronous code allows the application to continue processing other tasks while waiting for I/O operations to complete.
Utilize asynchronous versions of I/O-bound operations, such as database queries and HTTP requests.
Optimize Database Access:

Use an efficient ORM (Object-Relational Mapper) for database access, and ensure that queries are optimized. Entity Framework Core provides features like query caching and compiled queries to enhance performance.
Consider indexing, denormalization, and database caching strategies based on the specific requirements of your application.

Implement Caching Strategies:

Implement caching mechanisms to store frequently accessed data in memory, reducing the need to regenerate or fetch the data from its original source.
Use distributed caching for web farms or microservices architectures. ASP.NET Core provides support for various caching providers.

