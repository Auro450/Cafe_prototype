from PIL import Image, ImageDraw, ImageFont

bg_color = (253, 246, 234) # Sampled background near text
red_color = (185, 15, 17) # Matching Banner 1 deeper red
black_color = (20, 20, 20) # Match Banner 1 black
gray_color = (20, 20, 20) # Description is very dark

# Fonts
bold_font_path = 'scratch/Poppins-Black.ttf'
medium_font_path = 'scratch/Poppins-Medium.ttf'

title_large_font = ImageFont.truetype(bold_font_path, 160)
title_small_font = ImageFont.truetype(bold_font_path, 130) # Smaller for "in Town"
desc_font = ImageFont.truetype(medium_font_path, 55) # Increased from 45 to 55 to match banner 1

# ---------------------------------------------------------
# Banner 2
# ---------------------------------------------------------
img2 = Image.open('public/Banners/backup/Mobile_banner_for_a_cafe_202606180102.jpeg')
draw2 = ImageDraw.Draw(img2)

# Wipe old centered text completely - 1100 is safe here because sandwich is lower
draw2.rectangle([0, 220, 1536, 1100], fill=bg_color)

start_x = 100
current_y = 310 

draw2.text((start_x, current_y), 'Crispiest', fill=red_color, font=title_large_font)
current_y += 145 # Tighter line height
draw2.text((start_x, current_y), 'Crunch', fill=red_color, font=title_large_font)
current_y += 150
draw2.text((start_x, current_y), 'in Town', fill=black_color, font=title_small_font)

current_y += 250
draw2.text((start_x, current_y), 'Perfectly grilled bread with a savory,', fill=gray_color, font=desc_font)
current_y += 80 # Increased line height for bigger font
draw2.text((start_x, current_y), 'creamy filling that delights every bite.', fill=gray_color, font=desc_font)

img2.save('public/Banners/Mobile_banner_for_a_cafe_202606180102.jpeg', quality=95)

# ---------------------------------------------------------
# Banner 3
# ---------------------------------------------------------
img3 = Image.open('public/Banners/backup/Mobile_banner_for_a_cafe_202606180116.jpeg')
draw3 = ImageDraw.Draw(img3)

# Wipe old centered text without clipping the chicken bowl (which starts around y=980)
# We will use 940 to be absolutely safe
draw3.rectangle([0, 220, 1536, 940], fill=bg_color)

current_y = 310
draw3.text((start_x, current_y), 'The Ultimate', fill=red_color, font=title_large_font)
current_y += 145
draw3.text((start_x, current_y), 'Crunch', fill=black_color, font=title_large_font)

current_y += 250
draw3.text((start_x, current_y), 'Perfectly seasoned, bite-sized crispy', fill=gray_color, font=desc_font)
current_y += 80 # Increased line height for bigger font
draw3.text((start_x, current_y), 'chicken that delights in every bite.', fill=gray_color, font=desc_font)

img3.save('public/Banners/Mobile_banner_for_a_cafe_202606180116.jpeg', quality=95)

print("Banners updated perfectly with chicken bowl restored!")
