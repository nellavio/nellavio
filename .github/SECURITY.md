# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| < 2.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly. **Do not open a public issue.**

Instead, send an email to **[mateusz.wyrebek@gmail.com](mailto:mateusz.wyrebek@gmail.com)** with:

- A description of the vulnerability
- Steps to reproduce the issue
- Any relevant screenshots or logs
- Your suggested severity level (low / medium / high / critical)

## Response Timeline

- **Acknowledgment**: within 48 hours
- **Initial assessment**: within 5 business days
- **Fix or mitigation**: depends on severity, but we aim to resolve critical issues within 14 days

## Scope

The following are in scope:

- Authentication and authorization flaws
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- SQL injection
- Server-side request forgery (SSRF)
- Sensitive data exposure
- Broken access control

The following are **out of scope**:

- Vulnerabilities in third-party dependencies (report these to the respective maintainers)
- Social engineering attacks
- Denial of service (DoS) attacks
- Issues that require physical access to a device

## Disclosure Policy

We follow a coordinated disclosure model. After a fix is released, we will:

1. Credit the reporter (unless anonymity is requested)
2. Publish a brief advisory in the changelog

Thank you for helping keep this project and its users safe.
