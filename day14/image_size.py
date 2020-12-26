# -*- coding:utf-8 -*-
import os
from PIL import Image
import pandas as pd

file_list = []
width_list = []
height_list = []
# root_path = input('请输入 图片 所在地址:')
root_path = r'E:\素材\1'
suffix = ['.jpg', '.png']

for dirpath, dirnames, files in os.walk(root_path):
    for file in files:
        file_path = os.path.join(dirpath, file)
        for suf in suffix:
            if file.endswith(suf):
                img = Image.open(file_path)
                file_list.append(file)
                width_list.append(img.size[0])
                height_list.append(img.size[1])

content_dict = {
    'dir_name':file_list,
    'width':width_list,
    'height':height_list
}

df = pd.DataFrame(content_dict)
csv_path = os.path.join(root_path,'image_size.csv')
df.to_csv(csv_path, encoding='utf_8_sig')

from openpyxl import Workbook
xls_path = os.path.join(root_path,'image_size.xlsx')

def xls(path):
    #生成Excel文件
    wb = Workbook()
    ws = wb.active
    first_row = []
    datas = []
    with open(path,encoding='utf-8') as f:
        is_first_row = True
        for line in f:
            line = line[:-1]
            #存储第一行
            if is_first_row:
                is_first_row = False
                first_row = line.split(',')
                continue
            #存储第二行至max_row
            datas.append(line.split(','))
    ws.append(first_row)
    for data in datas:
        ws.append(data)
    wb.save(xls_path)
xls(csv_path)