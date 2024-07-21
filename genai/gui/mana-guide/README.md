## Qdrant
Establish qdrant server:

```bash
docker pull qdrant/qdrant

```
run the service 

``` 
export qdrant_dir=qdrant_storage
docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/$qdrant_dir:/qdrant/storage:z \
    qdrant/qdrant
```
