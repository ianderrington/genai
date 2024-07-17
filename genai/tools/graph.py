import networkx as nx
import torch
from torch.utils.data import Dataset
from transformers import PreTrainedTokenizer

from typing import List, Tuple
from collections import Counter


# TODO: Fix tests 
# TODO: Add some 'not related' nr_token="<NR>"" token from random selections starting. 
# Question:: Can resolve content as embedding ... how do we mix embeddings and tokens? 
class GraphTextDataset(Dataset):
    def __init__(self, graph: nx.DiGraph, tokenizer: PreTrainedTokenizer):
        self.graph = graph
        self.tokenizer = tokenizer
        self.node_frequency = Counter() 
        # sum up one time over node frequency to account for self
        # for node in self.graph.nodes():
        #     self.node_frequency[node] += 1
        self.edge_frequency = Counter() 
        self.update_frequencies()
        self.node_start = "<node>"
        self.node_end = "</node>"
        self.edge_start = "<edge>"
        self.edge_end = "</edge>"
        self.start_token = self.tokenizer.bos_token if self.tokenizer.bos_token and self.tokenizer.eos_token else "<path>"
        self.start_token = self.tokenizer.tokenize(self.start_token)
        self.end_token = self.tokenizer.eos_token if self.tokenizer.eos_token and self.tokenizer.bos_token else "</path>"
        self.end_token = self.tokenizer.tokenize(self.end_token)
        # self.start_token = "<path>"
        # self.end_token = "</path>"
        self.join_char = " "

    def __len__(self) -> int:
        return len(self.graph.nodes())

    def __getitem__(self, idx: int) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        node = list(self.graph.nodes())[idx]
        edges = list(self.graph.edges(node, data=True))

        # Build the text and weight sequence
        text, weights = self.build_text_and_weights(node, edges)

        # Tokenize text
        tokenized = self.tokenizer.convert_tokens_to_ids(text)
        # Return tokenized text and corresponding weights (must be same length as tokenized input)
        return tokenized, text, torch.tensor(weights)

    def build_text_and_weights(self, node: str, edges: list) -> Tuple[str, List[float]]:
        sequence = []
        weights = []

        # Example
        # n1:
        #     e1:
        #           n2:
        #               e2:
        #                   n3
        #                   n4
        #               e3:				
        #                   n5
        #     e4:
        #         n6
        # would be represented as
        # ```
        # n1 * (1/4): e1 * (1/3) : n2 * (1/3): e1 * (1/2): n3 * 1
        # n1 * (1/4): e1 * (1/3): n2 * (1/3): e1 * (1/2): n4 * 1
        # n1 * (1/4): e1 * (1/3): n2 * (1/3): e4 * 1: e3 * 1: n5 * 1
        # n1 * (1/4): e5 * 1: n6 * 1
        # ```
        # or separating out the 
        # ```
        # nodes = 
        # n1: e1 : n2 : e2 : n3
        # n1: e1 : n2 : e2 : n4
        # n1: e1 : n2 : e3 : n5
        # n1: e4 : n6
        # ```
        # weights =
        # ```
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1, 1 
        
      
        # Lets do this again. 
        # We will have one sequence path starting from the node to each leaf node

        This is broken AF 
        sequences = []
        weights = []
        def dfs(node, this_path, this_weight, visited=None):
            nonlocal sequences, weights
            if visited is None:
                visited = set()
                visited.add(node)
            node_str = self.join_char.join([self.node_start, node, self.node_end])
            node_tokens = self.tokenizer.tokenize(node_str)
            if self.graph.out_degree(node) == 0:
                # there are no children
                # and we can add the path to the sequence
                import ipdb; ipdb.set_trace()   
                this_path += [node_tokens]
                weight = 1/self.node_frequency[node]
                this_weight += [weight]*len(node_tokens)
                sequences.append(this_path)
                weights.append(this_weight)
                return
            # Go through the children
            for source, target, data in self.graph.edges(node, data=True):
                edge_label = data.get('label', '')
                edge_str = self.join_char.join([self.edge_start, edge_label, self.edge_end])
                edge_tokens = self.tokenizer.tokenize(edge_str)
                
                # Append the target node
                if target not in visited:
                    # import ipdb; ipdb.set_trace()
                    this_path += [node_tokens]
                    this_weight.append([self.node_frequency[node]]*len(node_tokens))
                    this_path += [edge_tokens]
                    weight = 1/self.edge_frequency[(node, edge_label)]
                    this_weight.append([weight]*len(edge_tokens))
                    dfs(target, this_path, this_weight, visited)
                    this_path.pop()
                    this_path.pop()
                    this_weight.pop()
                    this_weight.pop()
            return


        dfs(node, [], [], None)
        # Flatten the sequence
        # sequence = [item for sublist in sequence for item in sublist] 
        import ipdb; ipdb.set_trace()
        return sequences, weights




    def update_frequencies(self):
        self.update_node_frequencies()
        self.update_edge_frequencies()

    def update_node_frequencies(self):

        # Rewrite the above to be more efficient. Define an internal function if necessary to call recursively
        def count_leaves(node):
            if self.graph.out_degree(node) == 0:
                return 1
            else:
                return sum(count_leaves(successor) for successor in self.graph.successors(node))
        for node in self.graph.nodes():
            self.node_frequency[node] += count_leaves(node)

    def update_edge_frequencies(self):            
        # Edges with parent
        for source, target, data in self.graph.edges(data=True):
            edge_label = data.get('label', '')  # Extract edge label
            self.edge_frequency[(source, edge_label)] += 1  # Increment edge count in the frequency counter

import unittest
import networkx as nx
from transformers import BertTokenizer
# from your_module import GraphTextDataset  # Assuming GraphTextDataset is in 'your_module'

class TestGraphTextDataset(unittest.TestCase):
    def setUp(self):
        # # Initialize the graph
        # n1:
        #     e1:
        #           n2:
        #               e2:
        #                   n3
        #                   n4
        #               e3:				
        #                   n5
        #     e4:
        #         n6
        # ```
        # n1 * (1/4): e1 * (1/3) : n2 * (1/3): e1 * (1/2): n3 * 1
        # n1 * (1/4): e1 * (1/3): n2 * (1/3): e1 * (1/2): n4 * 1
        # n1 * (1/4): e1 * (1/3): n2 * (1/3): e4 * 1: e3 * 1: n5 * 1
        # n1 * (1/4): e5 * 1: n6 * 1
        # ```
        # or separating out the 
        # ```
        # nodes = 
        # n1: e1 : n2 : e2 : n3
        # n1: e1 : n2 : e2 : n4
        # n1: e1 : n2 : e3 : n5
        # n1: e4 : n6
        # ```
        # weights =
        # ```
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1/3, 1/3, 1/2, 1
        # 1/4, 1, 1

        self.graph = nx.DiGraph()
        self.graph.add_edge('n1', 'n2', label='e1')
        self.graph.add_edge('n2', 'n3', label='e2')
        self.graph.add_edge('n2', 'n4', label='e2')
        self.graph.add_edge('n2', 'n5', label='e3')
        
        self.graph.add_edge('n1', 'n6', label='e4')

        # Initialize tokenizer
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')

        # Initialize the dataset
        self.dataset = GraphTextDataset(self.graph, self.tokenizer)

    def test_node_frequencies(self):
        expected_node_frequencies = {'n1': 4, 'n2': 3, 'n3': 1, 'n4': 1, 'n5': 1, 'n6': 1}
        # print (f"Node Frequency:\n {self.dataset.node_frequency}")
        
        # self.assertEqual(self.dataset.node_frequency, expected_node_frequencies)
        self.assertEqual(dict(self.dataset.node_frequency), expected_node_frequencies)

    def test_edge_frequencies(self):
        expected_edge_frequencies = {
            ('n2', 'e2'): 2,
            ('n1', 'e1'): 1,
            ('n1', 'e4'): 1,
            ('n2', 'e3'): 1,
        }
        # print (f"Edge Frequency:\n {self.dataset.edge_frequency}")
        # self.assertEqual(self.dataset.edge_frequency, expected_edge_frequencies)
        self.assertEqual(dict(self.dataset.edge_frequency), expected_edge_frequencies)

    def test_text_and_weights(self):
        # Test for a specific node to check text generation and weighting
        # input_ids, weights = self.dataset[0]  # Test data for 'n1'
        tokens, text, weights = self.dataset[0]
        # This test could be expanded to verify the actual contents and weights match expected values
    
    def test_items(self):

        # items = []
        # for i, item in enumerate(self.dataset):

        #     items.append(item)
 
        # # 
        item = self.dataset[0]
        import ipdb; ipdb.set_trace()
        print(f"Items: {item}")    

if __name__ == '__main__':
    unittest.main()
#%%
# unittest.main(argv=[''], exit=False)
