import os
txt_path = r'F:\2020-12-js\day25\瀑布流\data.json'
writer = open(txt_path,"w",encoding="utf-8")
writer.write("[")
for i in range(1,200):
    obj = str({"src": f"./imgs/{i}.jpg","title":"人生不止有代码 诗和远方","height": "360px"})
    writer.write(obj+","+"\n")
writer.write("]")