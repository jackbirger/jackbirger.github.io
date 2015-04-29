import json
import pprint

storage = []
data = json.loads(open("../data/data-800m.json").read())

for i in range(101,227):	
	item = {}
	item['stop_id'] = i
	item['distance'] = []
	item['rating'] = []
	for d in data:
		if i == d['stop_id']:
			#print "match"
			item['distance'].append(round(d['distance']))
			item['rating'].append(d['rating'])
	storage.append(item)
	pprint.pprint(item)

# write json to file
out_file = open("../data/data-heatmap-dist-rating.json","w")
json.dump(storage,out_file)                                    
out_file.close()