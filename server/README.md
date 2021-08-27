# Server (harcmap)

To run app on server use: nodemon

---
## TODO:
- API
    - /auth - adapt to harcmap 1.0,
        - `email` field as user identification,
        - `password` politic
- Unit Tests
    - add HEAD, ~~TRACE~~ http methods tests,
    - security of main sources paths like: `/`, `/api`, `/api/auth`, etc. ,
- Performance Tests
    - Artillery,
    - Google Lighthouse,
- E2E Tests
    - Cypress/Puppeteer,
- Documentation
    - Swagger
        - /auth
            - adapt to changes on fields,
            - ~~length of fields~~
            - password politic
        - /auth/activation    
        - /users
        - /users/:id  
        - /users/reset-password  
        - /events
        - /events/:id
        - /events/:id/points
        - /events/:id/points/:id
        - /events/:id/categories
        - /events/:id/categories/:id
    - Confluence
        - documentation about test
        - simple API map documentation
        - error codes list,
        - database structure (old and new),
        - server data flow (validation elements),
        - "Przewodnik" - help where to search specific information about server app
- Environment
    - CI/CD,
    - Staging,
- Validation
    - merge endpoint definition with permissions and validation,
- LIBS:
    - logs,
    - logs on server,  
    - statistics,
    