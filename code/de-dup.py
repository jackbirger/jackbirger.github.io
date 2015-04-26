import json
import pprint

'''
You do not have to be good.
You do not have to walk on your knees
For a hundred miles through the desert, repenting.
You only have to let the soft animal of your body
love what it loves.

-Mary Oliver
http://www.rjgeib.com/thoughts/geese/geese.html
'''

data = json.loads(open("../data/data-2km.json").read())
scatterData = []
for d in data:
	match = 1
	for s in scatterData:
		if s['latitude'] == d['latitude'] and s['longitude'] == d['longitude']:
			match = 0
	if match:
		scatterData.append(d)

print "orig: {} de-dup: {}".format(len(data),len(scatterData))

# write json to file
out_file = open("../data/data-2km-scatterplot.json","w")
json.dump(scatterData,out_file)                                    
out_file.close()