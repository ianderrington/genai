import os

from datasets import Dataset

from ragas.testset.generator import TestsetGenerator, TestDataset
from ragas.testset.evolutions import simple, reasoning, multi_context
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

import pandas as pd

import typing as t


from mana_guide.components.llm import get_llm, get_embedding_model

## make main function and ingest via langchain
from langchain.document_loaders import DirectoryLoader
# loader = DirectoryLoader("your-directory")
# documents = loader.load()
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

import os
import dotenv
dotenv.load_dotenv()

from ragas import evaluate
from ragas.testset.evolutions import (
    ComplexEvolution,
    CurrentNodes,
    DataRow,
    Evolution,
    multi_context,
    reasoning,
    simple,
)

from ragas.metrics import (
    answer_relevancy,
    faithfulness,
    context_recall,
    context_precision,
)
DEFAULT_DISTRIBUTIONS = {simple: 0.5, reasoning: 0.25, multi_context: 0.25}
DEFAULT_METRICS = [
                context_precision,
                faithfulness,
                answer_relevancy,
                context_recall,
]
from base.components.evaluation.rag_retrieval_base import BaseEvaluator

            
class RagasEvaluator(BaseEvaluator):
    def __init__(self, 
                    evaluation_key,
                    generator_llm, 
                    critic_llm, 
                    embeddings,
                    testset_type='langchain', 
                    metrics=DEFAULT_METRICS,
                    auto_create_testset=True,
                    distributions=DEFAULT_DISTRIBUTIONS):
        super().__init__(test_set=None, auto_create_testset=auto_create_testset)
        self.evaluation_key = evaluation_key
        self.generator_llm = generator_llm
        self.critic_llm = critic_llm
        self.embeddings = embeddings
        self.testset_type = testset_type
        self.metrics = metrics
        self.auto_create_testset = auto_create_testset
        self.distributions = distributions

    
    def create_testset_from_langchain(self, documents, test_size=10):
        generator = TestsetGenerator.from_langchain(
            self.generator_llm,
            self.critic_llm,
            self.embeddings
        )

        # generate testset
        error_url = 'https://github.com/explodinggradients/ragas/issues/664'
        raise RuntimeError(f"Please check the error at {error_url}")
        testset = generator.generate_with_langchain_docs(documents, test_size=test_size, distributions=self.distributions)
        return testset
    
    def create_testset(self, documents, test_size=10):  
        if self.testset_type == 'langchain':
            return self.create_testset_from_langchain(documents, test_size=test_size)
        else:
            raise ValueError("Unknown testset type. Please provide a valid testset type.")
    
    def load_testset(self, testset_path=None):  
        if self.test_set:
            return self.test_set
        elif testset_path:
            return self.load_from_disk(testset_path)
        else:
            raise ValueError("Testset not found. Please provide a path to the testset file or create a new testset.")
        
    def _evaluate(self):

        result = evaluate(
            self.test_set,
            metrics=self.metrics,
        )

        return result

        
# generator with openai models
import argparse

def get_args():
    parser = argparse.ArgumentParser(description='Ragas Evaluator')
    parser.add_argument('-d', '--documents_path', type=str, help='The path to the documents to use for generating the testset', default='documents')
    parser.add_argument('-k', '--evaluation_key', type=str, help='The key to use for saving the evaluation results', default='evaluation_test')
    # parser.add_argument('--generator_model', default="gpt-3.5-turbo-16k", type=str, help='The model to use for generating the testset')
    # parser.add_argument('--critic_model', default="gpt-3.5-turbo-16k", type=str, help='The model to use for generating the testset')
    parser.add_argument('--testset_type', type=str, help='The model to use for generating the testset', default='langchain')
    parser.add_argument('--test_size', type=int, help='The size of the testset', default=10)
    parser.add_argument('--auto_create_testset', type=bool, help='Whether to automatically create a testset', default=True)
    parser.add_argument('--metrics', type=list, help='The metrics to use for evaluation', default=DEFAULT_METRICS)
    parser.add_argument('--distributions', type=dict, help='The distributions to use for generating the testset', default=DEFAULT_DISTRIBUTIONS)
    return parser.parse_args()

def main():
    args = get_args()
    # generator_llm = ChatOpenAI(model=args.generator_model)
    # critic_llm = ChatOpenAI(model=args.critic_model)
    generator_llm = get_llm('azure')
    critic_llm = get_llm('azure')
    embeddings = get_embedding_model('azure')
    # embeddings = OpenAIEmbeddings()
    evaluator = RagasEvaluator(
        evaluation_key=args.evaluation_key,
        generator_llm=generator_llm,
        critic_llm=critic_llm,
        embeddings=embeddings,
        testset_type=args.testset_type,
        metrics=args.metrics,
        auto_create_testset=args.auto_create_testset,
        distributions=args.distributions
    )
    assert os.path.exists(args.documents_path), "Please provide a valid path to the documents to use for generating the testset"
    if not args.documents_path:
        raise ValueError("Please provide a path to the documents to use for generating the testset")
    dl = DirectoryLoader(args.documents_path, 
                            # glob="**/[!.]*",
                            glob="**/*.py",
                            recursive=True)
    documents = dl.load()
    if not documents:
        raise ValueError("No documents found. Please provide a valid path to the documents to use for generating the testset")
    # import ipdb; ipdb.set_trace()
    debug_max_doc=4
    testset = evaluator.create_testset(documents[:debug_max_doc], test_size=args.test_size)
    evaluator.test_set = testset
    result = evaluator.evaluate()
    print(result)

if __name__ == "__main__":
    main()