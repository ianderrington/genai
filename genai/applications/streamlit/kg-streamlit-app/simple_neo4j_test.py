import os
from dotenv import load_dotenv
load_dotenv()


# from neo4j import GraphDatabase, basic_auth

# url = os.environ["NEO4J_URI"]

username = os.environ["NEO4J_USERNAME"] 
password = os.environ["NEO4J_PASSWORD"]
database = os.environ["NEO4J_URI"]

# _driver = GraphDatabase.driver(url, auth=basic_auth(username, password))

# _driver.verify_connectivity()
# _driver.close()
# pip3 install neo4j-driver
# python3 example.py

from neo4j import GraphDatabase, basic_auth

print(f"Username: {username}")
print(f"Password: {password}")
print(f"Database: {database}")
driver = GraphDatabase.driver(
    database,
#   "bolt://3.238.103.156:7687",
  auth=basic_auth(username, password)
#   auth=basic_auth("neo4j", "calls-accelerations-replacements"))
)
cypher_query = '''
MATCH (n)
RETURN COUNT(n) AS count
LIMIT $limit
'''

with driver.session(database="neo4j") as session:
    driver.verify_connectivity()
    
    results = session.read_transaction(
        lambda tx: tx.run(cypher_query,
                        limit=10).data())
    for record in results:
        print(record['count'])

driver.close()
