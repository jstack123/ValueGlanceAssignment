# ValueGlanceAssignment

Financial Table with Filtering and Sorting

Overview

This React project displays financial data fetched from an API endpoint in a tabular format. The table includes features for filtering and sorting the data based on various criteria, making it easier to analyze the information according to user-defined requirements.

Features

1. Fetch and Display Data

Data is fetched from the API endpoint: http://localhost:5000/api/financials.

The table includes the following columns:

Date (e.g., "2024-09-28")

Revenue

Net Income

Gross Profit

EPS (Earnings Per Share)

Operating Income

2. Filtering

Users can filter the table data based on the following criteria:

Date Range

Specify a start date and an end date to filter results within the given range.

Example: Display data between 2020-01-01 and 2024-12-31.

Revenue Range

Enter a minimum and/or maximum value to filter rows based on revenue.

Example: Show data where revenue is between $1,000 and $10,000.

Net Income Range

Enter a minimum and/or maximum value to filter rows based on net income.

Example: Show data where net income is greater than $5,000.

3. Sorting

Users can sort the data by any column in ascending or descending order:

Sortable Columns: Date, Revenue, Net Income, Gross Profit, EPS, and Operating Income.

Clicking on a column header toggles between ascending and descending order.
