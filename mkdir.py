import os
root_path = r'F:\js-learn'
for i in range(1, 41):
    if len(str(i)) == 1:
        i = f'0{i}'
    dir_path = os.path.join(root_path, f'day{i}')
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)
        md_path = os.path.join(dir_path, f'{i}_笔记.md')
        js_path1 = os.path.join(dir_path, f'pratice1.js')
        js_path2 = os.path.join(dir_path, f'pratice2.js')
        js_pathR = os.path.join(dir_path, f'review.js')
        if not os.path.exists(md_path):
            writer = open(md_path, 'w', encoding='utf-8')
            writer1 = open(js_path1, 'w', encoding='utf-8')
            writer2 = open(js_path2, 'w', encoding='utf-8')
            writerR = open(js_pathR, 'w', encoding='utf-8')
            writer.write(f'[toc]\n\n# {i}\_笔记\n')