---
title: CSVql
summary: CSVql is a Nim-based utility that enables querying CSV files using standard
  ANSI-SQL. By loading data into an in-memory SQLite database, it provides a powerful
  interface for complex data manipulation, including joins and filtering, without
  requiring manual data conversion.
codeUrl: https://github.com/Bennyelg/csvql
isShow: false
rtos: ''
libraries:
- sqlite
topics:
- bash
- csv
- csv-reading
- nim-lang
- nimble
- readcsv
- sql
- sql-query
lastUpdated: '2025-12-27'
createdAt: '2025-12-27'
updatedAt: '2025-12-27'
relatedProjects:
- db-wrapper
- sqlite-for-raspberry-pi-pico
- littledb-sql-like-database-for-esp32
- bloom
- sqlite3-for-esp-idf
- lwip-mysql-connector
---

Managing and analyzing data stored in CSV files often involves cumbersome manual filtering or complex scripting. **CSVql** simplifies this process by allowing developers and data analysts to treat their CSV files like relational database tables. Written in Nim, this tool provides a bridge between flat files and the power of ANSI-SQL.

### Querying CSVs Like a Boss

The core philosophy of CSVql is simplicity. Instead of importing data into a database management system, you can run SQL queries directly against your files from the command line. The tool uses the file path as the table name, making it intuitive to perform operations like selects, joins, and limits. 

For example, you can perform a complex join between two different CSV files with a single command:

```bash
SELECT t1.name, t1.lastname, t2.birthday 
FROM '/path/to/csv/test.csv' as t1 
LEFT JOIN '/path/to/csv/test2.csv' as t2 
ON t1.name = t2.name
```

### Intelligent Data Handling

One of the standout features of CSVql is its ability to guess delimiters automatically. Users don't need to specify whether a file is comma-separated, tab-separated, or uses more exotic characters like tildes or carets. The system checks against a wide array of possible delimiters, including:

- Standard: `,`, `;`, `\t` 
- Symbols: `:`, `~`, `*`, `$`, `#`, `@`, `/`, `%`, `^` 

To ensure compatibility with SQL syntax, CSVql automatically sanitizes headers. Spaces are replaced with underscores, special characters are removed, and the `#` symbol is intelligently converted to `no` (e.g., `# of drivers` becomes `no_of_drivers`).

### Technical Architecture and Limitations

Under the hood, CSVql leverages **SQLite** to provide its SQL engine. When a query is executed, the tool parses the CSV and loads the data into an in-memory SQLite instance. This approach ensures high performance and full ANSI-SQL support, but it does come with a few constraints:

1.  **Memory Bound**: Since SQLite is used in-memory, the CSV files must be small enough to fit within your system's available RAM.
2.  **Header Requirement**: The tool requires a header row to be present in the CSV to define the column names for the SQL schema.
3.  **Dependencies**: Users must have SQLite installed on their system for the tool to function.

### Getting Started

As a Nim project, CSVql is lightweight and fast. It is managed via `csvql.nimble`, making it easy to integrate into Nim-based workflows or use as a standalone CLI tool for quick data exploration. Whether you are performing a quick `LIMIT 10` to peek at data or executing complex multi-file joins, CSVql brings the familiarity of SQL to the ubiquity of CSV files.
