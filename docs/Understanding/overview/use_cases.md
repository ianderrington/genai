Thhere are various activities and fields that leverage the capabilities of Generative AI.

## General Modalities

The following table provides an overview of the general modalities in which Generative AI can be applied:

| Modality | Examples |
| --- | --- |
| Language | Spoken and Written |
| Time series | Music, Speech, Finances |
| Visual 2D | Images, Diagrams |
| Visual 3D | 3D Models, Virtual Reality |
| Visual 2D with time | Animated Graphics, Videos |
| Visual 3D with time | 3D Animations, Simulations |
| Graphical | Relation and Influence Networks |
| Generally linear sequences | Genome, Proteome |
| Multidimensional Temporal sequences | Weather, Brain Recordings, Stock Market |
| Multimodal variants | Combination of the above methods |

For a more detailed description of these modalities, refer to [this section](../../Using/examples/by_modality/index.md).

## General Activities

Because at its core, GenAI works on Information, there several core ways numerous ways in which Generative AI can be used. The application often depends on the [field](../../Using/examples/by_field/index.md). Here are some activities that can be used in many, if not all, fields of applications:

### Creating information 

At it's base, Generative AI is used to create information, such as new text or images. The information that is created can have two general uses: for direct muse by people or other algorithms, or for the use in the training or improving Gen()AI using [simulated](../data/preparation/augmentation.md) data. 

### Converting Information

Generative AI can generate content in one domain with input from another. Language, a common method of understanding and communicating the world around us, is often used to generate content in different domains, such as images, movies, and music. Domain mapping can also be reversed: taking an input image and generating a description or caption for the image.

### Compactifying Information

Generative AI is instrumental in summarization and compression. It can provide brief, accurate summaries of a larger body of text, effectively compactifying information. Interestingly, as discussed in the reference below, Language Modeling is found to be equivalent to compression lossless methods. 

??? important "[Language Modeling Is Compression](https://arxiv.org/pdf/2309.10668.pdf) demonstrates lossless compression of text and images with upwards of 3x smaller compression."
    Uses either newly trained 200K-3M transformer models or pre-trained Chinchilla models and achieves impressive compression rates.
    <img width="1298" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/ffa8ac86-3876-4ecb-8b18-e14b47b972e5">
    Details on implementation are somewhat hidden.

### Finding Information

Generative AI can understand relationships between words and concepts. By embedding an input, the technology can measure semantic, or 'meaning', nearness via distance calculations. This capability enhances the potential for memory recall with imperfect inputs and improves action routing.

### Classifying and Predicting Information

While traditionally the domain of AI/ML, Generative AI can also be used for classification and predictions. For instance, it can take an input sentence and predict the sentiment within it (like positive or negative). Although not necessarily as accurate or efficient as smaller, finely tuned models, Generative AI offers greater versatility by allowing multiple classifications or predictions to be made. These methods can be improved with additional supervised training.

