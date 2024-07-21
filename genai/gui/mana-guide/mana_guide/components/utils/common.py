import numpy as np
import torch
from omegaconf import OmegaConf


def collapse_dict(dict_list, reduce_keys_list=["position"]):
    """This function will collapse a list of dictionaries into a single dictionary."""
    collapsed_dict = {}
    for d in dict_list:
        for k, v in d.items():
            if k not in collapsed_dict:
                collapsed_dict[k] = []

            collapsed_dict[k].append(v)
    # if they are tensors then we need to stack them
    try:
        for k, v in collapsed_dict.items():
            if isinstance(v[0], torch.Tensor):
                collapsed_dict[k] = torch.stack(v)
            elif isinstance(v[0], np.ndarray):
                collapsed_dict[k] = np.stack(v)
            else:
                collapsed_dict[k] = v
    except:
        import ipdb

        ipdb.set_trace()
    # for the keys that we want to reduce, we will reduce them with a mean
    for k in reduce_keys_list:
        if isinstance(collapsed_dict[k][0], torch.Tensor):
            collapsed_dict[k] = torch.mean(collapsed_dict[k])
        elif isinstance(collapsed_dict[k][0], np.ndarray):
            collapsed_dict[k] = np.mean(collapsed_dict[k])
        else:
            collapsed_dict[k] = np.mean(collapsed_dict[k])
    return collapsed_dict


def resolve_omega_conf(cfg, register=False):
    # Custom resolver to extract any information needed in some specific manner to share across configurations
    #
    if register:
        register_resolvers()
    OmegaConf.resolve(cfg)


def register_resolvers():
    OmegaConf.register_new_resolver("eval", eval)
    OmegaConf.register_new_resolver("div_up", lambda x, y: (x + y - 1) // y)
    # resolver to describe kmer_vocab using num_char**kmer_length + special_token_map
    OmegaConf.register_new_resolver(
        "kmer_vocab",
        lambda char, kmer_length, special_token_map: len(char) ** kmer_length
        + len(special_token_map)
        + 1,
    )
    OmegaConf.register_new_resolver(
        "max_embeddings",
        lambda kmer_length, kmer_stride, input_length: (input_length - kmer_length) // kmer_stride
        + 1,
    )
