import json
import pprint

# remove extra attributes from the data objects

storage = []
'''
{"rating": 5.0,
 "review_count": 13,
 "name": "The Table At Season To Taste",
 "zip": "02140",
 "distance": 949.1989438455477,
 "longitude": -71.1310318,
 "stop_id": 101,
 "latitude": 42.3983409,
 "line": ["red"],
 "categories": ["American", "Breakfast & Brunch"]
}
'''

data = json.loads(open("../../data/data-3km-scatterplot.json").read())

for d in data:
    item = {}

    # if d['name'] == 'Starbucks' or d['name'] == 'Dunkin Donuts':
    #     item['name'] = d['name']
    # else:
    
    #     item['name'] = ''
    item['name'] = d['name']
    item['latitude']     = d['latitude']
    item['longitude']    = d['longitude']
    item['review_count'] = d['review_count']
    item['categories']   = d['categories']
    storage.append(item)

# write json to file
out_file = open("../../data/data-3km-heatmap-slim.json","w")
json.dump(storage,out_file)                                    
out_file.close()


