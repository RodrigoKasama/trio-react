header = '<?xml version="1.0" encoding="utf-8" ?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="360" width="235" viewBox="0 0 235 360">'			
color = ["red", "green","purple"]
squi = '<path class="setcolor setline" id="shape" d="m 33,180 c 6,-13 11,-23 26,-28 15,-5 31,-1 58,7 23,7 36,0 43,-3 7,-4 17,-9 30,-9 13,0 18,21 12,33 -5,11 -14,23 -26,28 -12,5 -32,1 -59,-7 -17,-5 -29,-3 -42,3 -9,4 -18,10 -30,9 -13,0 -19,-18 -12,-33 z"></path>'
pill = '<rect class="setcolor setline" id="shape" x="30" y="145" width="175" height="70" rx="35"></rect>'
diamond = '<polygon class="setcolor setline" id="shape" points="30,180 117,145 205,180 117,215"></polygon>'
template_pattern = '<pattern id="verticalStripes" patternUnits="userSpaceOnUse" width="10" height="10"> <rect width="4" height="10" fill="@" /> </pattern>'
style = '<style type="text/css"> .setline {\
	stroke: @;\
	stroke-width: 4;\
	stroke-linejoin: round;\
}'

dicio_color = {"red": "0", "green": "1", "purple": "2"}
dicio_shape = {"squi": "0", "pill": "1", "diamond": "2"}
dicio_preenc = {"full": "0", "stripe": "1", "empty": "2"}
dicio_num = {1: "0", 2: "1", 3: "2"}


def gen_svg(cor, shape, num, preenc):
	
	# Header
	output = header + "\n"
	
	# Defs
	output += '<defs>\n'
	
	if preenc == "full":
		pass
	elif preenc == "stripe":
		output += template_pattern.replace("@", cor) + "\n"
	else:
		output += template_pattern.replace("@", 'white') + "\n"
		
	# Style
	prefix = '' if preenc in ("stripe", "empty") else ' .setcolor {fill: @;}'
	output += (style + prefix).replace("@", cor)  + " </style>\n"
	
	# Shape
	if shape == "squi":
		output += squi + "\n"
	elif shape == "pill":
		output += pill + "\n"
	elif shape == "diamond":
		output += diamond + "\n"
		
		
	output += '</defs>\n'
	
	# Background
	output += '<rect x="5" y="5" height="350" width="225" rx="10" ry="10" fill="white" stroke="grey" stroke-width="2" />'
	
	# Desenho
	prefix = '' if preenc == "full" else 'fill="url(#verticalStripes)"'
	if num == 1:
		output += f'<use xlink:href="#shape" {prefix}/>'
	elif num == 2:
		output += f'<use y="-50" xlink:href="#shape" {prefix}/>'
		output += f'<use y="50" xlink:href="#shape" {prefix}/>'
	else:
		output += f'<use y="-100" xlink:href="#shape" {prefix}/>'
		output += f'<use xlink:href="#shape" {prefix}/>'
		output += f'<use y="100" xlink:href="#shape" {prefix}/>'
		
	output += '\n</svg>'
	filename = dicio_color[cor] + dicio_shape[shape] + dicio_preenc[preenc] + dicio_num[num] + ".svg"
	return output, filename

i=0

for cor in dicio_color.keys():
	for shape in dicio_shape.keys():
		for preenc in dicio_preenc.keys():
			for num in dicio_num.keys():
				i += 1
				svg_content, filename = gen_svg(cor, shape, num, preenc)
				print(f"Generating SVG: {filename} {i}")
				with open(f"./svgs/{filename}", "w") as file:
					file.write(svg_content)

print(f"Generated {i} SVG files.")


