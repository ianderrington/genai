import sqlite3

def create_database(db_name):
    # Connect to SQLite database (or create it if it doesn't exist)
    conn = sqlite3.connect(db_name)

    # Create a cursor object
    cursor = conn.cursor()

    # Create table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS employees(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            hire_date TEXT NOT NULL
        )
    ''')

    # Commit the transaction
    conn.commit()

    # Close the connection
    conn.close()

# Use the function
if __name__ == '__main__':
    create_database('qdrant.db')