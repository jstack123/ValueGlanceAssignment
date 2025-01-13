# import os
# print(os.environ.get("CONDA_DEFAULT_ENV"))

from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import pandas as pd

# Replace <api_key> with your actual API key from Financial Modeling Prep
API_KEY = "EbwtZP2u4LqyWPZR7ui5msAmBCtcBhjg"
url_endpoint = f"https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey={API_KEY}"

def fetch_financial_data(url):
    print("Fetching data>>>")
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return None

def display_financial_data(data):
    # Check if data is valid
    if not data:
        print("No data available.")
        return
    
    # Extract relevant fields
    columns = ["date", "revenue", "netIncome", "grossProfit", "eps", "operatingIncome"]
    table_data = [
        {col: entry.get(col, "N/A") for col in columns} for entry in data
    ]
    
    # Create a DataFrame and display it
    df = pd.DataFrame(table_data)
    df.rename(
        columns={
            "date": "Date",
            "revenue": "Revenue",
            "netIncome": "Net Income",
            "grossProfit": "Gross Profit",
            "eps": "EPS",
            "operatingIncome": "Operating Income",
        },
        inplace=True,
    )
    
    print(df)

# Fetch data from the API
financial_data = fetch_financial_data(url_endpoint)

# Display the data in a table
display_financial_data(financial_data)

@app.route('/api/financials', methods=['GET'])
def get_financials():
    """Endpoint to get financial data."""
    data = fetch_financial_data(url_endpoint)
    if not data:
        return jsonify({"error": "Failed to fetch financial data"}), 500

    # Extract relevant fields
    columns = ["date", "revenue", "netIncome", "grossProfit", "eps", "operatingIncome"]
    formatted_data = [
        {col: entry.get(col, "N/A") for col in columns} for entry in data
    ]
    print("FORMATTED DATE")
    print(formatted_data)
    return jsonify(formatted_data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)