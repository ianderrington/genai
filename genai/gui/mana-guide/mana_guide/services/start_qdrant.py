from qdrant_client import QdrantClient

client = QdrantClient("localhost", port=6333)

from qdrant_client.http.models import Distance, VectorParams

# TODO: Size needs to be determined by embeddings model 

client.recreate_collection(
    collection_name="Article",
    vectors_config=VectorParams(size=1536, distance=Distance.DOT),
)