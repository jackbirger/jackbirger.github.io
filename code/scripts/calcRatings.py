import json
import pprint

storage = []
category_list = ["American (New)","Asian Fusion","Barbeque","Brazilian","Breakfast & Brunch","Buffets","Burgers",
                 "Cafes","Cantonese","Chicken Wings","Chinese","Coffee & Tea","Colombian","Comfort Food","Delis","Dim Sum","Diners",
                 "Falafel","Fast Food","Food Stands","French","Gastropubs","German","Gluten-Free","Greek","Halal","Hot Dogs",
                 "Indian","Irish","Italian","Japanese","Korean","Kosher","Latin American","Mediterranean","Mexican","Middle Eastern",
                 "Pizza","Salad","Sandwiches","Seafood","Soup","Southern","Spanish","Steakhouses","Sushi Bars","Taiwanese","Tapas Bars",
                 "Tapas/Small Plates","Tex-Mex","Thai","Turkish","Vegan","Vegetarian","Vietnamese"]

data = json.loads(open("../../data/data-500m-merged.json").read())

for i in range(101,228):    
    # {"stop_id":101, "station":"Alewife Station", "line":["red"], "x":640, "y": 196, "ll":[42.395781, -71.142059]},

    item = {}
    item['stop_id'] = i
    item['rating'] = {}
    item['rating']['all_cat'] = [0,0,0,0,0,0,0,0,0]

    for d in data:
        if i == d['stop_id']:

            if d['rating'] == 1:
                item['rating']['all_cat'][0] += 1
            elif d['rating'] == 1.5:
                item['rating']['all_cat'][1] += 1
            elif d['rating'] == 2:
                item['rating']['all_cat'][2] += 1
            elif d['rating'] == 2.5:
                item['rating']['all_cat'][3] += 1
            elif d['rating'] == 3:
                item['rating']['all_cat'][4] += 1
            elif d['rating'] == 3.5:
                item['rating']['all_cat'][5] += 1
            elif d['rating'] == 4:
                item['rating']['all_cat'][6] += 1
            elif d['rating'] == 4.5:
                item['rating']['all_cat'][7] += 1
            elif d['rating'] == 5:
                item['rating']['all_cat'][8] += 1

    for c in category_list:
        # ["Afghan", "African", "American (New)", "American (Traditional)", ...
        item['rating'][c] = [0,0,0,0,0,0,0,0,0]

    for d in data:
        # [{"rating": 4.0, "stop_id": 101, "categories": ["Sushi Bars", "Japanese"]}
        if i == d['stop_id']:


            for c in d['categories']:
                try:
                    category_list.index(c)
                except:
                    # print "ignored category: {}".format(c)
                    continue

                if i == 140 and c == 'Barbeque':
                    pprint.pprint(d);

                #print "cat {}".format(c)
                if d['rating'] == 1:
                    item['rating'][c][0] += 1
                elif d['rating'] == 1.5:
                    item['rating'][c][1] += 1
                elif d['rating'] == 2:
                    item['rating'][c][2] += 1
                elif d['rating'] == 2.5:
                    item['rating'][c][3] += 1
                elif d['rating'] == 3:
                    item['rating'][c][4] += 1
                elif d['rating'] == 3.5:
                    item['rating'][c][5] += 1
                elif d['rating'] == 4:                         
                    item['rating'][c][6] += 1
                elif d['rating'] == 4.5:
                    item['rating'][c][7] += 1
                elif d['rating'] == 5:
                    item['rating'][c][8] += 1

    storage.append(item)


# write json to file
out_file = open("../../data/data-heatmap-rating-500m-merged.json","w")
json.dump(storage,out_file)                                    
out_file.close()
