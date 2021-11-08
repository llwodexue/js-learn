# -*- coding: utf-8 -*-
import os
import shutil

def del_suffix(root_path,suffix):
    for root, dirs, files in os.walk(root_path):
        for file in dirs:
            exts = suffix.split(' ')
            for ext in exts:
                if file == ext:
                    shutil.rmtree(os.path.join(root, file))

if __name__ == "__main__":
    root_path = r"E:\文档\js-learn"
    suffix = 'node_modules'
    del_suffix(root_path, suffix)