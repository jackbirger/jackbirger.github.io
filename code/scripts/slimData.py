import json
import pprint

storage = []
category_list = ["American (New)","American (Traditional)","Asian Fusion","Barbeque","Bars","Breakfast & Brunch","Burgers",
                 "Cafes","Cantonese","Chicken Wings","Chinese","Coffee & Tea","Delis","Dim Sum","Diners","Donuts",
                 "Falafel","Fast Food","Food Stands","French","Gluten-Free","Greek","Halal","Hot Dogs",
                 "Indian","Irish","Italian","Japanese","Korean","Kosher","Latin American","Mediterranean","Mexican","Middle Eastern",
                 "Pizza","Salad","Sandwiches","Seafood","Soup","Steakhouses","Sushi Bars","Taiwanese","Tapas Bars",
                 "Tapas/Small Plates","Thai","Turkish","Vegan","Vegetarian","Vietnamese"]


def removekey(d, key):

    r = dict(d)

    try:
        del r[key]
    except:
        pass

    return r


data = json.loads(open("../../data/data-500m.json").read())

for d in data:
    match = 0
    for c in d['categories']:
        try:
            category_list.index(c)
            match = 1
        except:
            # print "ignored category: {}".format(c)
            continue

    if match:
        r = removekey(d, 'distance')
        v = removekey(r, 'zip')
        storage.append(v)


# write json to file
out_file = open("../../data/data-500m-slim.json","w")
json.dump(storage,out_file)                                    
out_file.close()


