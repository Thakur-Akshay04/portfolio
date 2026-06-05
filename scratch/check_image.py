from PIL import Image
img = Image.open('d:/PROJECT/portfoilio/logo/AT.png')
pixels = img.convert('RGB').getdata()
min_r = min(p[0] for p in pixels)
min_g = min(p[1] for p in pixels)
min_b = min(p[2] for p in pixels)
print('Min values:', min_r, min_g, min_b)
