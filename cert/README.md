# Self-Signed Certificates

This folder contains self-signed certificates that can be
used in the local dev environment to run localhost over https.

eg.
`https://localhost:3000`

<hr>

## Generate new certificates:

`openssl req -x509 -nodes -days 3650 -newkey rsa:4096 -keyout key.pem -out cert.pem`

<hr>

The current certificates are valid for 10 years and were created with the following values:
- **Country Name (2 letter code) []:**
  - AU
- **State or Province Name (full name) []:**
  - Queensland
- **Locality Name (eg, city) []:**
  - Brisbane
- **Organization Name (eg, company) []:** 
  - GLASS & Co Pty Ltd
- **Organizational Unit Name (eg, section) []:**
  - no value
- **Common Name (eg, fully qualified host name) []:** 
  - no value
- **Email Address []:**
  - dale.mckay@glassandco.com.au

<hr>
