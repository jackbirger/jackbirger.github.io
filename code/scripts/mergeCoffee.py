import json
import pprint


all_data = json.loads(open("../../data/data-500m.json").read())
coffee_data = json.loads(open("../../data/data-coffee-500m.json").read())


for d in coffee_data:
    match = 1
    for s in all_data:
        if s['latitude'] == d['latitude'] and s['longitude'] == d['longitude'] and s['stop_id'] == d['stop_id']:
            match = 0 # it matches, turn off
    if match:
        all_data.append(d)


# write json to file
out_file = open("../../data/data-500m-merged.json","w")
json.dump(all_data,out_file)                                    
out_file.close()
