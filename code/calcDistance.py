import json
import pprint

storage = []
data = json.loads(open("../data/data-800m.json").read())

for i in range(101,228):	
	item = {}
	item['stop_id'] = i
	item['distance'] = []
	item['rating'] = [0,0,0,0,0,0,0,0,0]
	for d in data:
		if i == d['stop_id']:
			#print "match"
			if d['distance'] > 800:
				item['distance'].append(800)
			else:	
				item['distance'].append(round(d['distance']))
			# item['rating'].append(d['rating'])

			if d['rating'] == 1:
				item['rating'][0] += 1
			elif d['rating'] == 1.5:
				item['rating'][1] += 1
			elif d['rating'] == 2:
				item['rating'][2] += 1
			elif d['rating'] == 2.5:
				item['rating'][3] += 1
			elif d['rating'] == 3:
				item['rating'][4] += 1
			elif d['rating'] == 3.5:
				item['rating'][5] += 1
			elif d['rating'] == 4:
				item['rating'][6] += 1
			elif d['rating'] == 4.5:
				item['rating'][7] += 1
			elif d['rating'] == 5:
				item['rating'][8] += 1
	storage.append(item)
	pprint.pprint(item['rating'])

# write json to file
out_file = open("../data/data-heatmap-dist-rating.json","w")
json.dump(storage,out_file)                                    
out_file.close()