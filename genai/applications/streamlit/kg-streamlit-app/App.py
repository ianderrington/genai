import streamlit as st
# from langchain.chat_models import ChatOpenAI, AzureChatOpenAI
# from langchain_community.chat_models import AzureChatOpenAI
from langchain_community.chat_models import AzureChatOpenAI
from langchain_openai import AzureChatOpenAI

# from langchain_community.chat_models import ChatOpenAI
# from langchain.schema import HumanMessage
from langchain.schema import HumanMessage, ChatMessage, AIMessage, SystemMessage

from langchain.schema.output_parser import StrOutputParser
# from langchain.graphs import Neo4jGraph
from langchain_community.graphs import Neo4jGraph
from streamlit_agraph import agraph, Node, Edge, Config

from langchain.chains import GraphCypherQAChain
# from neo4j import GraphDatabase

from neo4j import GraphDatabase, basic_auth

import os
# from openai import OpenAI

from dotenv import load_dotenv
load_dotenv()

# Function to process the query and return a response
def process_query(query, cypher_chain=None):
    if not cypher_chain:
        return "", [], []
    # Use GraphCypherQAChain to get a Cypher query and a natural language response
    try:
        result = cypher_chain(query)
    except ValueError:
        response_structured = "Sorry, I don't understand your question."
        nodes = []
        edges = []
        return response_structured, nodes, edges
    # result = cypher_chain(query)
    intermediate_steps = result['intermediate_steps']
    final_answer = result['result']
    generated_cypher = intermediate_steps[0]['query']
    response_structured = final_answer
    
    # Fetch graph data using the Cypher query
    nodes, edges = fetch_graph_data(nodesType=None, relType=None, direct_cypher_query=generated_cypher, intermediate_steps=intermediate_steps)
    
    return response_structured, nodes, edges

# Function to fetch data from Neo4j
def fetch_graph_data(nodesType=None, relType=None, direct_cypher_query=None, intermediate_steps=None):
    # Use the direct Cypher query if provided
    if direct_cypher_query:
        context = intermediate_steps[1]['context']
        nodes, edges = process_graph_result(context)
    else:
        if nodesType or relType:
            # Construct the Cypher query based on selected filters
            cypher_query = construct_cypher_query(nodesType, relType)
            with GraphDatabase.driver(os.environ["NEO4J_URI"], 
                                    auth=(os.environ["NEO4J_USERNAME"], 
                                            os.environ["NEO4J_PASSWORD"])).session() as session:
                result = session.run(cypher_query)
                nodes, edges = process_graph_result_select(result)
    
    return nodes, edges


# Function to construct the Cypher query based on selected filters
def construct_cypher_query(node_types, rel_types):
    # Create a list of MATCH clauses for node types
    node_clauses = []
    for node_type in node_types:
        node_clauses.append(f"(p:{node_type})-[r]->(n) ")

    # Create a list of WHERE clauses for relationship types
    rel_clauses = []
    for rel_type in rel_types:
        rel_clauses.append(f"type(r)='{rel_type}' ")

    # Combine the clauses into one Cypher query
    if rel_clauses:
        rel_match = " OR ".join(rel_clauses)
        query = f"MATCH {' OR '.join(node_clauses)} WHERE {rel_match} RETURN p, r, n"
    else:
        query = f"MATCH {' OR '.join(node_clauses)} RETURN p, r, n"
    
    return query

def process_graph_result(result):
    nodes = []
    edges = []
    node_names = set()  # This defines node_names to track unique nodes

    for record in result: 
        # Process nodes
        p_name = record['p.name']
        o_name = record['o.name']

        # Add nodes if they don't already exist
        if p_name not in node_names:
            nodes.append(Node(id=p_name, label=p_name, size=5, shape="circle"))
            node_names.add(p_name)
        if o_name not in node_names:
            nodes.append(Node(id=o_name, label=o_name, size=5, shape="circle"))
            node_names.add(o_name)

        # Process edges
        relationship_label = record['type(r)']
        edges.append(Edge(source=p_name, target=o_name, label=relationship_label))

    return nodes, edges

def process_graph_result_select(result):
    nodes = []
    edges = []
    node_names = set()  # This defines node_names to track unique nodes

    for record in result: 
        # Process nodes
        p = record['p']
        n = record['n']
        p_name = p['name']
        n_name = n['name']

       # Add nodes if they don't already exist
        if p_name not in node_names:
            nodes.append(Node(id=p_name, label=p_name, size=5, shape="circle"))
            node_names.add(p_name)
        if n_name not in node_names:
            nodes.append(Node(id=n_name, label=n_name, size=5, shape="circle"))
            node_names.add(n_name)

        # Process edges, include the date in the label if it exists
        r = record['r']
        relationship_label = r.type
        if 'date' in r:
            relationship_label = f"{r.type} ({r['date']})"
        edges.append(Edge(source=p_name, target=n_name, label=relationship_label))
    
    return nodes, edges

# from langchain.agents import initialize_agent
st.title("Graph Agent Copilot")

# NEO4J_URI= st.secrets["NEO4J_URI"]
# NEO4J_USERNAME= st.secrets["NEO4J_USERNAME"]
# NEO4J_PASSWORD= st.secrets["NEO4J_PASSWORD"]
username = os.environ["NEO4J_USERNAME"]
password = os.environ["NEO4J_PASSWORD"]
database_uri = os.environ["NEO4J_URI"]
# import ipdb; ipdb.set_trace()
# driver = GraphDatabase.driver(URI, auth=basic_auth(USERNAME, PASSWORD))
driver = GraphDatabase.driver(database_uri, auth=basic_auth(username, password))
graph = Neo4jGraph(
    url=database_uri,
    username=username,
    password=password
)
    # url=os.environ["NEO4J_URI"],
    # username=os.environ["NEO4J_USERNAME"],
    # password=os.environ["NEO4J_PASSWORD"])

# Fetch the unique node types and relationship types for sidebar filters
# node_types = ['Person', 'Organization', 'Group', 'Topic']
# relationship_types = [
#     'BELONGS_TO', 'FORMER_CEO_OF', 'CEO_OF', 'FORMER_MEMBER_OF', 'CURRENT_MEMBER_OF','REMAIN_MEMBER_OF', 'SCHEDULES_CALL_WITH',
#     'QUESTIONED_FIRING_SAM', 'FOUNDED_BY', 'INVESTED_IN', 'CONSIDERS_BOARD_SEAT', 'FORMER_CTO_OF', 'INFORMED_OF_FIRING', 'FIRED_AS_CEO',
#     'ALL_HANDS_MEETING', 'RESIGNS_FROM', 'APPOINTED_INTERIM_CEO', 'JOINS_MICROSOFT', 'THREATEN_TO_RESIGN', 'CONSIDERS_MERGER_WITH',
#     'IN_TALKS_WITH_BOARD', 'RETURNS_AS_CEO', 'RETURNS_TO', 'CONSIDERS_BOARD_SEAT', 'AIMS_TO_DEVELOP_AGI_WITH', 'QUESTIONED_FIRING_SAM',
#     'FOUNDED_BY', 'INVESTED_IN', 'DEMOTED_FROM', 'RELEASES_HIRING_STATEMENT', 'HIRED_BY', 'REGRETS_FIRING','MENTIONS', 'EXPLAINS_DECISIONS', 'DESCRIBES', 'FORMER_PRESIDENT']

node_types = ['Biomarker','Disease','Evidence','Gene','Phenotype','Population','Publication','Variant', 'Target', 'Therapy', 'User']
relationship_types = ['HAS_REFERENCE', 'IS_ASSOCIATED_WITH','TARGETS' ]



st.sidebar.header('Filters')
selected_node_types = st.sidebar.multiselect('Node Types', node_types, default=node_types)
selected_relationship_types = st.sidebar.multiselect('Relationship Types', relationship_types, default=relationship_types)

# Initialize state variables and check for changes in selections
if 'prev_node_types' not in st.session_state:
    st.session_state.prev_node_types = selected_node_types
if 'prev_relationship_types' not in st.session_state:
    st.session_state.prev_relationship_types = selected_relationship_types

# Update graph if selections change
if (selected_node_types != st.session_state.prev_node_types or 
    selected_relationship_types != st.session_state.prev_relationship_types):
    st.session_state.prev_node_types = selected_node_types
    st.session_state.prev_relationship_types = selected_relationship_types
    # Construct and fetch new graph data
    cypher_query = construct_cypher_query(selected_node_types, selected_relationship_types)
    nodes, edges = fetch_graph_data(nodesType=selected_node_types, relType=selected_relationship_types)
    # Define the configuration for the graph visualization
    config = Config(height=600, width=800, directed=True, nodeHighlightBehavior=True, highlightColor="#F7A7A6")
    # Render the graph using agraph with the specified configuration
    agraph(nodes=nodes, edges=edges, config=config)


with st.sidebar:
    openai_api_key = st.text_input("OpenAI API Key", key="langchain_search_api_key_openai", type="password")
    "[Get an OpenAI API key](https://platform.openai.com/account/api-keys)"

from langchain.prompts import ChatPromptTemplate, PromptTemplate, HumanMessagePromptTemplate

def combine_contexts(structured, unstructured, qa_llm):
    
    # messages = [{'role': 'system', 'content': 'You are an assistant of an advanced retrieval augmented system,\
    #              who prioritizes accuracy and is very context-aware.\
    #              Pleass summarize text from the following and generate\
    #              a comprehensive, logical and context_aware answer.'},
    #             {'role': 'user', 'content': structured + unstructured}]
    messages = [
        SystemMessage(content="You are an assistant of an advanced retrieval augmented system, "
                      "who prioritizes accuracy and is very context-aware. Pleass summarize text "
                      "from the following and generate a comprehensive, logical and context_aware answer."),
        HumanMessagePromptTemplate.from_template(structured + unstructured)
        
    ]
    prompt = ChatPromptTemplate.from_messages(messages)
    
    # import ipdb; ipdb.set_trace()
    combined_context_chain = prompt | qa_llm | StrOutputParser()

    # completion = client.chat.completions.create(model="gpt-4",
    #                                             messages=messages,
    #                                             temperature=0)
    # response = completion.choices[0].message.content

    response = combined_context_chain.invoke({})
    return response

# Initialize OpenAI API key and Chat model
from retrievers import initialize_retrievers
from chain import initialize_chain, Question
openai_api_key = os.environ["OPENAI_API_KEY"]
if openai_api_key:
    # client = OpenAI(api_key=openai_api_key)
    # os.environ["OPENAI_API_KEY"] = openai_api_key

    result = initialize_retrievers()
    typical_rag, parent_vectorstore, hypothetic_question_vectorstore, summary_vectorstore = result
    chain_txt = initialize_chain( 
                                typical_rag, parent_vectorstore, 
                                 hypothetic_question_vectorstore, 
                                 summary_vectorstore)
    cypher_llm = AzureChatOpenAI(
        temperature=0,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        openai_api_version=os.getenv("OPENAI_API_VERSION"),
        openai_api_base=os.getenv("OPENAI_API_BASE"),
        deployment_name="gpt-4",
    )
    qa_llm = AzureChatOpenAI(
        temperature=0,
        openai_api_key=os.getenv("OPENAI_API_KEY"),
        openai_api_version=os.getenv("OPENAI_API_VERSION"),
        openai_api_base=os.getenv("OPENAI_API_BASE"),
        deployment_name="gpt-4",
    )
    
    cypher_chain = GraphCypherQAChain.from_llm(
        cypher_llm=cypher_llm,
        qa_llm=qa_llm,
        graph=graph,
        verbose=True,
        return_intermediate_steps=True
    )
else:
    chain_txt = None
    qa_llm = None
    cypher_llm = None
    cypher_chain = None


# Chat interface
if "messages" not in st.session_state:
    st.session_state["messages"] = [{"role": "assistant", "content": "Hi there, ask me a question."}]

for msg in st.session_state.messages:
    st.chat_message(msg["role"]).write(msg["content"])

if prompt := st.chat_input(placeholder="Ask a question"):
    if not openai_api_key:
        st.error("Please add your OpenAI API key to continue.")
    else:
        # These Dont work because they are not azure  endpoints
        # Solution: https://github.com/langchain-ai/langchain/issues/13284
        # cypher_llm = ChatOpenAI(temperature=0, model_name='gpt-4', api_key=openai_api_key)
        # qa_llm = ChatOpenAI(temperature=0, api_key=openai_api_key)


        # Update session state with new message
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.chat_message("user").write(prompt)
        response_structured, nodes, edges= process_query(prompt)
        response_nonstructured = chain_txt.invoke(
                {"question": prompt},
                {"configurable": {"strategy": "parent_strategy"}},
            )
        config = Config(height=600, width=800, directed=True, nodeHighlightBehavior=True, highlightColor="#F7A7A6")
        final_ans = combine_contexts(response_structured, response_nonstructured, qa_llm )
        st.session_state.messages.append({"role": "assistant", "content": final_ans})
        st.chat_message("assistant").write(final_ans)
        agraph(nodes=nodes, edges=edges, config=config)

