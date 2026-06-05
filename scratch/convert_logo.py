from PIL import Image

img = Image.open('d:/PROJECT/portfoilio/logo/AT.png').convert('RGBA')
datas = img.getdata()

newData = []
for item in datas:
    r, g, b, a = item
    # If the pixel is light (background), make it transparent
    if r > 180 and g > 180 and b > 180:
        newData.append((0, 0, 0, 0))
    else:
        # It's a dark pixel (the AT logo text). Keep it black.
        newData.append((0, 0, 0, 255))

img.putdata(newData)

# Crop to the actual logo bounds
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)

# Pad to make it a perfect square
width, height = img.size
max_dim = max(width, height)
padding = int(max_dim * 0.1)
new_dim = max_dim + 2 * padding

square_img = Image.new('RGBA', (new_dim, new_dim), (0, 0, 0, 0))
offset_x = (new_dim - width) // 2
offset_y = (new_dim - height) // 2
square_img.paste(img, (offset_x, offset_y))

# Resize to standard 512x512
final_img = square_img.resize((512, 512), Image.Resampling.LANCZOS)
final_img.save('d:/PROJECT/portfoilio/app/icon.png')
print("Successfully generated transparent black square icon.png")
