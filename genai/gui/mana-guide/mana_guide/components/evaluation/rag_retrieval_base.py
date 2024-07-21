import os
import typing as t

import pandas as pd

import typing as t

from ragas.testset.evolutions import DataRow
from ragas.testset.generator import TestDataset

## Classes from Ragas

# class DataRow(BaseModel):
#     question: str
#     contexts: t.List[str]
#     ground_truth: t.Union[str, float] = np.nan
#     evolution_type: str
#     metadata: t.List[dict]

# @dataclass
# class TestDataset:
#     """
#     TestDataset class
#     """

#     test_data: t.List[DataRow]

#     def _to_records(self) -> t.List[t.Dict]:
#         data_samples = []
#         for data in self.test_data:
#             data_dict = dict(data)
#             data_dict["episode_done"] = True
#             data_samples.append(data_dict)
#         return data_samples

#     def to_pandas(self) -> pd.DataFrame:
#         return pd.DataFrame.from_records(self._to_records())

#     def to_dataset(self) -> Dataset:
#         return Dataset.from_list(self._to_records())
import logging

logger = logging.getLogger(__name__)

class TestDatasetCSV(TestDataset):
    """
    TestDataset class
    """
    def __init__(self, test_data: t.List[DataRow]):
        self.super().__init__(test_data)
    
    def write_to_csv(self, path: str):
        self.to_pandas().to_csv(path, index=False)
        
    def read_from_csv(cls, path: str):
        data = pd.read_csv(path)
        return cls.from_pandas(data)
    
    def from_pandas(cls, data: pd.DataFrame):
        test_data = []
        for _, row in data.iterrows():
            test_data.append(DataRow(**row.to_dict()))
        return cls(test_data)
    
    def to_dataset(self) -> TestDataset:
        return TestDataset.from_list(self._to_records())


class BaseEvaluator():
    #abstract class to evaluate the performance of an unknown object
    def __init__(self, test_set=None, auto_create_testset=True):
        self.test_set = test_set
        self.auto_create_testset = auto_create_testset

    def _create_testset(self):
        self.test_set = self._create_testset()

    def _load_testset(self):
        self.test_set = self._load_testset()
    
    def load_testset(self, testset_path=None):
        logger.info(f"Loading testset from {testset_path}")
        if self.test_set:
            return self.test_set
        elif testset_path:
            return self.load_from_disk(testset_path)
        else:
            raise ValueError("Testset not found. Please provide a path to the testset file or create a new testset.")
    
    def make_path(self):
        if not os.path.exists("testsets"):
            os.makedirs("testsets")
        path =  f"testsets/{self.evaluation_key}.csv"
        logger.info(f"Testset path: {path}")
        return path

    def save_to_disk(self, overwrite=False):
        logger.info(f"Saving testset to disk")
        path = self.make_path()
        if self.test_set:
            if not os.path.exists(path) or overwrite:
                self.test_set = self.test_set.to_pandas().to_csv(path, index=False)
            else:
                raise ValueError("Testset already exists. Please provide a new name for the testset. or set overwrite=True to overwrite the existing testset.")
        else:
            raise ValueError("Testset not found. Please create a testset before saving to disk.")

    def load_from_disk(self, path):
        logger.info(f"Loading testset from disk {path}")
        if os.path.exists(path):
            self.test_set = TestDatasetCSV.from_pandas(path)
        else:
            raise ValueError("Testset file not found. Please provide a valid path to the testset file.")

    def setup_tests(self):
        logger.info("Setting up tests")
        if self.auto_create_testset:
            self._create_testset()
        elif not self.test_set:
            self._load_testset()

        if not self.test_set:
            raise ValueError("Testset not found. Please create a new testset or load a testset from disk.")

        if not testset:
            testset = self.load_testset()

    def create_testset(self):
        raise NotImplementedError
    
    def load_testset(self):
        raise NotImplementedError
    
    def evaluate(self):
        self.setup_tests()
        return self._evaluate() 
    
    def _evaluate(self):
        raise NotImplementedError


class DummyEvaluator(BaseEvaluator):
    """ Provides a dummy class using base evaluator classes and defining very simple methods for testing"""
    def __init__(self, test_set):
        super().__init__(test_set=test_set)

    def create_testset(self):
        return TestDataset([DataRow(question="What is the capital of France?", contexts=["Paris"], ground_truth="Paris", evolution_type="simple", metadata=[{"source": "Wikipedia"}])])

    def load_testset(self):
        return TestDataset([DataRow(question="What is the capital of France?", contexts=["Paris"], ground_truth="Paris", evolution_type="simple", metadata=[{"source": "Wikipedia"}])])
     
    def _evaluate(self):
        ground_truth = self.test_set['ground_truth']
        generated_results = self.test_set['ground_truth']
        accuracy = generated_results == ground_truth
        return {"accuracy": accuracy.mean()}
