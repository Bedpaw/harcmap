# Server (harcmap)

## TODO:
- API
    - /auth - adapt to harcmap 1.0,
        - `password` politic
    - /events
- Unit Tests
    - add HEAD, ~~TRACE~~ http methods tests,
    - security of main sources paths like: `/`, `/api`, `/api/auth`, etc. ,
    - database mock, lib for clean, add data,
- Performance Tests
    - Artillery,
    - Google Lighthouse,
- E2E Tests
    - Cypress/Puppeteer,
- Documentation
    - Confluence
        - documentation about test
        - simple API map documentation
        - error codes list,
        - server data flow (validation elements),
- Environment
    - CI/CD,
- Validation
    - merge endpoint definition with permissions and validation,
- LIBs:
    - logs,
    - logs on server,
    - statistics,
    - refactor Model (small modules),
    - validations details only on staging/local,
- Secure:
    - secure all POST, PUT, DELETE endpoints from DDOS
    