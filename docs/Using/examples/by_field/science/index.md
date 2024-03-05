Generative AI has one of the most powerful potentials for science by enabling rapid-iteration closed-loop science-loop systems. A science loop system is one where measurements inform understanding in such a way to make better experiments and solutions.


```mermaid
    graph LR
    A[🛠️ Build<br>Experiments]:::blue --> B[🔬 Experiment<br>and Record]:::green
    B --> A
    B --> C[📏 Make into Measurements <br>to create Meaning]:::red
    C --> D[🔍 Analyze<br>for Meaning]:::yellow
    C --> B
    D --> C
    D --> E[🔮 Generate and Predict<br>New Experiments]:::purple
    E --> D
    E --> B
    E --> A

    classDef blue fill:#add8e6,stroke:#333,stroke-width:2px,color:black;
    classDef green fill:#98fb98,stroke:#333,stroke-width:2px,color:black;
    classDef red fill:#ffcccb,stroke:#333,stroke-width:2px,color:black;
    classDef yellow fill:#ffebcd,stroke:#333,stroke-width:2px,color:black;
    classDef purple fill:#dda0dd,stroke:#333,stroke-width:2px,color:black;
```


## Autonomous Science in the Loop

Science in the Loop Optimizaton enables for the creation and optimization of scientific-related components. Generally related to manual or semiautonomous autonomous biological, biochemistry, or chemistry laboratories, they may extend to other domains.

There are components of include 

- [Protocol optimization](#protocol-optimization)
- [Molecule optimization](#molecule-optimization)
- [Measurement optimization](#measurement-optimization)


!!! tip "[Autonomous chemical research with large language models](https://github.com/gomesgroup/coscientist)" coscientist
    
    **Developments** The authors reveal how a 'Coscientist' architecture can assist in the development of more effective research results.
    <img width="741" alt="image" src="https://github.com/ianderrington/genai/assets/76016868/5baa36c3-a3b0-4021-82da-c1f1aa6ea2a7">
    [Paper](https://www.nature.com/articles/s41586-023-06792-0)
    [Arxiv](https://arxiv.org/pdf/2304.05332.pdf)
    
### Protocol Optimization

Getting protocols in usable manners is key. They must be usable by people, firstly, and then by more automated robotic systems. 
Optimized protocols first need to start from having protocols. Protocols may start from those recorded in databases, or may be extracted from literature. 

??? tip "[ProtoCode: Leveraging Large Language Models for Automated Generation of Machine-Readable Protocols from Scientific Publications](https://arxiv.org/pdf/2312.06241.pdf)"
    **Developments** The authors develop Protocode to finetune LLMs to convert protocols from literature into operational files for a thermal cycler system. 

### Molecule Optimization 

Molecule optimization focuses on the improvement of generally single component within a larger process. They can be simple molecules, as more complex bio-relevant molecules like drugs and biomolecules such as proteins and DNA. 


### Measurement Optimization

Measurement optimization involves improving the ability to measure something. This includes tuning physical parameters within a


### Robotic automation

Autonomous laboratories are controlled by different robotics setups and automation languages including specific ones Lua or more general in-house control systems. 




