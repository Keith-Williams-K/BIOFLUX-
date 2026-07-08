# BioFlux Database Setup

This folder contains MySQL schema and seed scripts for the BioFlux backend.

## Files

- `schema.sql` — creates tables for researchers, experiments, samples, and measurements.
- `seed.sql` — inserts sample data that matches BioFlux biology and flow experiment concepts.

## Setup

1. Create the MySQL database, for example:
   ```ps1
   mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS bioflux_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
   ```

2. Apply the schema:
   ```ps1
   mysql -u user -p bioflux_db < db/schema.sql
   ```

3. Insert sample data:
   ```ps1
   mysql -u user -p bioflux_db < db/seed.sql
   ```

## Environment

The project now uses MySQL, and `.env.example` includes `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `DB_PORT` values.
