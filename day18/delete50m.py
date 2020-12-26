import os
root_path = r'E:\js-learn'
for dirpath, dirnames, files in os.walk(root_path):
    for file in files:
        file_path = os.path.join(dirpath, file)
        if os.path.getsize(file_path) > 5*1024*1024:
            print(file_path)
            os.remove(file_path)
