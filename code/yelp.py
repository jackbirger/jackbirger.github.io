'''

This script scrapes data from yelp via their API v2

-----------------------------------------------------
This is the full data we get back from Yelp location search:

{
    u'is_claimed': True,
    u'distance': 194.98740085724452,
    u'mobile_url': u'http://m.yelp.com/biz/grendels-den-restaurant-and-bar-cambridge',
    u'rating_img_url': u'http://s3-media1.fl.yelpassets.com/assets/2/www/img/5ef3eb3cb162/ico/stars/v1/stars_3_half.png',
    u'review_count': 683,
    u'name': u"Grendel's Den Restaurant & Bar",
    u'rating': 3.5,
    u'url': u'http://www.yelp.com/biz/grendels-den-restaurant-and-bar-cambridge',
    u'categories': [[u'Bars', u'bars'], [u'American (New)', u'newamerican']],
    u'id': u'grendels-den-restaurant-and-bar-cambridge',
    u'is_closed': False,
    u'phone': u'6174911160',
    u'snippet_text': u'In the summer of 2014 I made a lofty list of places I must go to before the year ends. Obviously that did not go as planned, BUT I finally made my way over...',
    u'image_url': u'http://s3-media1.fl.yelpassets.com/bphoto/u7bcLv9F-0ZHNarFbWFI_Q/ms.jpg',
    u'location': 
    {
        u'city': u'Cambridge',
        u'display_address': [u'89 Winthrop St', u'Harvard Square', u'Cambridge, MA 02138'],
        u'geo_accuracy': 8.0,
        u'neighborhoods': [u'Harvard Square'],
        u'postal_code': u'02138',
        u'country_code': u'US',
        u'address': [u'89 Winthrop St'],
        u'coordinate': 
        {
            u'latitude': 42.3725014,
            u'longitude': -71.1209641
        },
        u'state_code': u'MA'
    },
    u'display_phone': u'+1-617-491-1160',
    u'rating_img_url_large': u'http://s3-media3.fl.yelpassets.com/assets/2/www/img/bd9b7a815d1b/ico/stars/v1/stars_large_3_half.png',
    u'menu_provider': u'single_platform',
    u'menu_date_updated': 1387605897,
    u'snippet_image_url': u'http://s3-media2.fl.yelpassets.com/photo/4zoVe9OzCYH7qCfaSTTJmg/ms.jpg',
    u'rating_img_url_small': u'http://s3-media1.fl.yelpassets.com/assets/2/www/img/2e909d5d3536/ico/stars/v1/stars_small_3_half.png'
}

-----------------------------------------------------
And here's what we care about for this application:

{
    u'name': u"Grendel's Den Restaurant & Bar",
    u'rating': 3.5,
    u'categories': [[u'Bars', u'bars'], [u'American (New)', u'newamerican']],
    u'location': 
    {
        u'coordinate': 
        {
            u'latitude': 42.3725014,
            u'longitude': -71.1209641
        },
    },
}

-----------------------------------------------------
Individual business data looks like this:

Anthony's East Side Deli
Querying http://api.yelp.com/v2/business/anthonys-east-side-deli-arlington? ...
Result for business "anthonys-east-side-deli-arlington" found:
{ u'categories': [[u'Delis', u'delis']],
  u'display_phone': u'+1-781-777-2033',
  u'id': u'anthonys-east-side-deli-arlington',
  u'image_url': u'http://s3-media2.fl.yelpassets.com/bphoto/zFgQJXCyoNuiZJEq8sPaCg/ms.jpg',
  u'is_claimed': True,
  u'is_closed': False,
  u'location': { u'address': [u'159 Massachusetts Ave'],
                 u'city': u'Arlington',
                 u'coordinate': { u'latitude': 42.4050584,
                                  u'longitude': -71.1411091},
                 u'country_code': u'US',
                 u'display_address': [ u'159 Massachusetts Ave',
                                       u'East Arlington',
                                       u'Arlington, MA 02474'],
                 u'geo_accuracy': 9.5,
                 u'neighborhoods': [u'East Arlington'],
                 u'postal_code': u'02474',
                 u'state_code': u'MA'},
  u'menu_date_updated': 1403043672,
  u'menu_provider': u'eat24',
  u'mobile_url': u'http://m.yelp.com/biz/anthonys-east-side-deli-arlington',
  u'name': u"Anthony's East Side Deli",
  u'phone': u'7817772033',
  u'rating': 4.5,
  u'rating_img_url': u'http://s3-media2.fl.yelpassets.com/assets/2/www/img/99493c12711e/ico/stars/v1/stars_4_half.png',
  u'rating_img_url_large': u'http://s3-media4.fl.yelpassets.com/assets/2/www/img/9f83790ff7f6/ico/stars/v1/stars_large_4_half.png',
  u'rating_img_url_small': u'http://s3-media2.fl.yelpassets.com/assets/2/www/img/a5221e66bc70/ico/stars/v1/stars_small_4_half.png',
  u'review_count': 17,
  u'reviews': [ { u'excerpt': u'This place is such a great find in Arlington.  The food is always fresh with great bread.  I got the chicken parm sandwich and it had great sauce, cheese...',
                  u'id': u'GZ47zQOv7cC7ssxYIB8Y3A',
                  u'rating': 5,
                  u'rating_image_large_url': u'http://s3-media3.fl.yelpassets.com/assets/2/www/img/22affc4e6c38/ico/stars/v1/stars_large_5.png',
                  u'rating_image_small_url': u'http://s3-media1.fl.yelpassets.com/assets/2/www/img/c7623205d5cd/ico/stars/v1/stars_small_5.png',
                  u'rating_image_url': u'http://s3-media1.fl.yelpassets.com/assets/2/www/img/f1def11e4e79/ico/stars/v1/stars_5.png',
                  u'time_created': 1425052821,
                  u'user': { u'id': u'Y6FErfCQkxYKiDZ_HmzcIQ',
                             u'image_url': u'http://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/cc4afe21892e/assets/img/default_avatars/user_medium_square.png',
                             u'name': u'Maria T.'}}],
  u'snippet_image_url': u'http://s3-media4.fl.yelpcdn.com/assets/srv0/yelp_styleguide/cc4afe21892e/assets/img/default_avatars/user_medium_square.png',
  u'snippet_text': u'This place is such a great find in Arlington.  The food is always fresh with great bread.  I got the chicken parm sandwich and it had great sauce, cheese...',
  u'url': u'http://www.yelp.com/biz/anthonys-east-side-deli-arlington'}

'''
import json
import pprint
import sys
import urllib
import urllib2
import math
import oauth2

API_HOST         = 'api.yelp.com'
SEARCH_LIMIT     = 20
SEARCH_PATH      = '/v2/search/'
BUSINESS_PATH    = '/v2/business/'
SEARCH_RADIUS    = 1600
CATEGORIES = [  'Restaurants', 'Pizza', 'Burgers', 'Mexican', 'Sandwiches', 'Japanese', 'Cafes', 'Fast Food', 'Italian', 'American (Traditional)', 'Sushi Bars', 'American (New)', 'Bars', 'Breakfast & Brunch', 'Indian', 'Nightlife', 'Seafood' ]

# OAuth credentials
CONSUMER_KEY    = "srjoLIpsGQzbuL8olqs60g"
CONSUMER_SECRET = "xfs7njXxIn6gMkT-z73oNGbFcJQ"
TOKEN           = "firuNF-NSRdkW8UNOCbRX3oEPnxnQDTI"
TOKEN_SECRET    = "8729C5E15fqQ1CqQIYsZIBMo4mw"
data = []
stops = [
            { 'location': 'alewife station, cambrige, ma', 'line': ['red'], 'stop_id': 101 },
            { 'location': 'davis square, cambrige, ma',    'line': ['red'], 'stop_id': 102 },
            { 'location': 'porter square, cambrige, ma',   'line': ['red'], 'stop_id': 103 },
            { 'location': 'harvard square, cambrige, ma',  'line': ['red'], 'stop_id': 104 },
            { 'location': 'central square, cambrige, ma',  'line': ['red'], 'stop_id': 105 },
            { 'location': 'kendall square, cambrige, ma',  'line': ['red'], 'stop_id': 106 },
            { 'location': '170 charles street, boston, ma',  'line': ['red'], 'stop_id': 107 },                     # charles/mgh
            { 'location': 'summer and washington street, boston, ma',  'line': ['red', 'green'], 'stop_id': 108 },  # park street (right next to downtown crossing)           
            { 'location': 'downtown crossing, boston, ma',  'line': ['red', 'orange'], 'stop_id': 109 },             
            { 'location': 'atlantic avenue & summer street, boston, ma',  'line': ['red'], 'stop_id': 110 },        # south station     
            { 'location': 'dorchester ave and w broadway, boston, ma',  'line': ['red'], 'stop_id': 111 },          # broadway       
            { 'location': '599 old colony ave, boston, ma',  'line': ['red'], 'stop_id': 113 },                     # jfk/umass       
            { 'location': '121 savin hill avenue, boston, ma',  'line': ['red'], 'stop_id': 114 },                  # savin hill      
            { 'location': 'dorchester avenue & charles street dorchester, ma',  'line': ['red'], 'stop_id': 115 },  # field's corner      
            { 'location': 'dayton and nixon street, dorchester, ma',  'line': ['red'], 'stop_id': 116 },            # shawmut     
            { 'location': '1900 dorchester avenue, dorchester, ma',  'line': ['red'], 'stop_id': 117 },             # ashmont    
            { 'location': '1670 blue hill avenue, mattapan, ma',  'line': ['red'], 'stop_id': 118 },                # mattapan    
            { 'location': '3 holmes st, quincy, ma',  'line': ['red'], 'stop_id': 119 },                            # north quincy    
            { 'location': '285-297a newport ave, quincy, ma',  'line': ['red'], 'stop_id': 120 },                   # wollaston    
            { 'location': '1300 hancock street, quincy, ma',  'line': ['red'], 'stop_id': 121 },                    # quincy center    
            { 'location': '180 penn st, quincy, ma',  'line': ['red'], 'stop_id': 122 },                            # quincy adams    
            { 'location': '197 ivory street, braintree, ma',  'line': ['red'], 'stop_id': 123 },                    # braintree   
        ]

def main():

    category  = 'Restaurants'
    for stop in stops:
        try:
            query_api(category, stop)
        except urllib2.HTTPError as error:
            sys.exit('Encountered HTTP error {0}. Abort program.'.format(error.code))


def query_api(category, stop):

    url_params = {
        'term': 'restaurants',
        'location': stop['location'].replace(' ', '+'),
        'radius_filter' : 1600,
        'sort': '0',
        'offset': '0',
        'limit': 20
    }

    response = request(API_HOST, SEARCH_PATH, url_params=url_params)
    runs  = int(math.ceil(int(response['total'])/float(20)))

    for i in range(runs):

        url_params['offset'] = i*20
        response = request(API_HOST, SEARCH_PATH, url_params=url_params)
        for item in response['businesses'] :
            
            cat = []
            latitude  = ""
            longitude = ""

            try:
                for c in item['categories']:
                    cat.append(c[0])
                latitude  = item['location']['coordinate']['latitude']
                longitude = item['location']['coordinate']['longitude']
            except:
                continue

            business = { 'name'       : item['name'], 
                         'rating'     : item['rating'], 
                         'categories' : cat, 
                         'latitude'   : latitude,
                         'longitude'  : longitude,
                         'line'       : stop['line'],
                         'stop_id'    : stop['stop_id']
                       }

            data.append(business)
            print business['name']

            # response = get_business(item['id'])
            # pprint.pprint(response, indent=2)
            # print ""

    with open('data.json', 'w') as outfile:
        json.dump(data, outfile)



def request(host, path, url_params=None):

    """Prepares OAuth authentication and sends the request to the API.

    Args:
        host (str): The domain host of the API.
        path (str): The path of the API after the domain.
        url_params (dict): An optional set of query parameters in the request.

    Returns:
        dict: The JSON response from the request.

    Raises:
        urllib2.HTTPError: An error occurs from the HTTP request.
    """
    url_params = url_params or {}
    url = 'http://{0}{1}?'.format(host, urllib.quote(path.encode('utf8')))

    consumer = oauth2.Consumer(CONSUMER_KEY, CONSUMER_SECRET)
    oauth_request = oauth2.Request(method="GET", url=url, parameters=url_params)

    oauth_request.update(
        {
            'oauth_nonce': oauth2.generate_nonce(),
            'oauth_timestamp': oauth2.generate_timestamp(),
            'oauth_token': TOKEN,
            'oauth_consumer_key': CONSUMER_KEY
        }
    )
    token = oauth2.Token(TOKEN, TOKEN_SECRET)
    oauth_request.sign_request(oauth2.SignatureMethod_HMAC_SHA1(), consumer, token)
    signed_url = oauth_request.to_url()
    
    print u'Querying {0} ...'.format(url)

    conn = urllib2.urlopen(signed_url, None)
    try:
        response = json.loads(conn.read())
    finally:
        conn.close()

    return response


def get_business(business_id):

    """Query the Business API by a business ID.

    Args:
        business_id (str): The ID of the business to query.

    Returns:
        dict: The JSON response from the request.
    """
    business_path = BUSINESS_PATH + business_id

    return request(API_HOST, business_path)



if __name__ == '__main__':
    main()
