from PIL import Image, ImageDraw, ImageFont, ImageFilter
from random import randint

class L_BLUR(ImageFilter.BuiltinFilter):
    name = "l_blur"
    filterargs = (5, 5), 16, 0, (
        1, 1, 1, 1, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 0, 0, 0, 1,
        1, 1, 1, 1, 1,
    )

# random.randint(M, N) 产生一个M到N的随机整数
def rand_img_color():
    return randint(0,255), randint(0,255), randint(0,255)
def rand_num_color():
    return randint(0,127), randint(0,127), randint(0,127)
def rand_zh():
    return chr(randint(0x4E00,0x9FBF))
def rand_char():
    # 小写字母
    return chr(randint(97,122))
    # 大写字母
    # return chr(randint(65,90))
def rand_num():
    return str(randint(0,9))

# 1.创建空图片
image = Image.new('RGB',(120,60),(255,255,255))
draw = ImageDraw.Draw(image)

# 2.渲染背景
for x in range(0,120):
    for y in range(0,60):
        draw.point((x, y), rand_img_color())
w, h = (image.size)
# 竖线（分割数字）
# draw.line((w/4,0) + (w/4,h), fill=rand_img_color(), width=3)
# draw.line((w/2,0) + (w/2,h), fill=rand_img_color(), width=3)
# draw.line((w/4*3,0) + (w/4*3,h), fill=rand_img_color(), width=3)
# draw.line((0,h/2) + (w,h/2), fill=rand_img_color(), width=3)
image = image.filter(L_BLUR)

# 3.渲染文字
font = ImageFont.truetype('simhei.ttf', 30)
draw = ImageDraw.Draw(image)
for x in range(4):
    y = randint(10,20)
    draw.text((30*x,y), rand_num(), rand_num_color(), font)

image.show()