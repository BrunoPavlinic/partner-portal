# Partner Portal

## Project Overview
This Partner Portal is an Angular-based application designed to manage and monitor partner relationships. The application provides functionalities for viewing partners' data, managing approvals, and monitoring performance metrics through a dashboard.

Key features include:
- Dashboard with performance metrics visualization
- Partner management with filtering, sorting, and pagination capabilities
- Approval workflow for partner requests
- Responsive design using Angular Material components

Challenges encountered during development included implementing efficient client-side data handling for partner records and optimizing the application for performance with large datasets.

## Technologies Used
- **Angular:** Version 19.2.0
- **Angular Material:** Version 19.2.7 for UI components
- **RxJS:** Version 7.8.0 for reactive programming
- **TypeScript:** Version 5.7.2
- **Angular CDK:** Version 19.2.7

## Error Handling
The application implements several error handling mechanisms:

- **API Request Timeout:** Configured timeout of 15 seconds for API requests to prevent infinite loading states
- **Error State Management:** Dedicated error state tracking in the PartnerTableState interface
- **Graceful Degradation:** Fallback to empty arrays when API requests fail, allowing the UI to render without crashing
- **Error Boundaries:** Components are designed to handle and display appropriate error messages when data fetching fails

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
