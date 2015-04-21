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
import threading

API_HOST         = 'api.yelp.com'
SEARCH_LIMIT     = 20
SEARCH_PATH      = '/v2/search/'
BUSINESS_PATH    = '/v2/business/'
CATEGORIES = [  'Restaurants', 'Pizza', 'Burgers', 'Mexican', 'Sandwiches', 'Japanese', 'Cafes', 'Fast Food', 'Italian', 'American (Traditional)', 'Sushi Bars', 'American (New)', 'Bars', 'Breakfast & Brunch', 'Indian', 'Nightlife', 'Seafood' ]

# OAuth credentials
CONSUMER_KEY    = "srjoLIpsGQzbuL8olqs60g"
CONSUMER_SECRET = "xfs7njXxIn6gMkT-z73oNGbFcJQ"
TOKEN           = "firuNF-NSRdkW8UNOCbRX3oEPnxnQDTI"
TOKEN_SECRET    = "8729C5E15fqQ1CqQIYsZIBMo4mw"

query_cnt = 0
data = []
stops = [
            { 'll': '42.395781, -71.142059', 'line': ['red'], 'stop_id': 101 },  # alewife
            { 'll': '42.397096, -71.121853', 'line': ['red'], 'stop_id': 102 },  # davis
            { 'll': '42.388453, -71.119147', 'line': ['red'], 'stop_id': 103 },  # porter
            { 'll': '42.373562, -71.118911', 'line': ['red'], 'stop_id': 104 },  # harvard
            { 'll': '42.365556, -71.103847', 'line': ['red'], 'stop_id': 105 },  # central
            { 'll': '42.362575, -71.086209', 'line': ['red'], 'stop_id': 106 },  # kendall/MIT
            { 'll': '42.361212, -71.070674', 'line': ['red'], 'stop_id': 107 },  # charles/mgh
            { 'll': '42.356487, -71.062563', 'line': ['red', 'green'], 'stop_id': 108 },   # park street (right next to downtown crossing)           
            { 'll': '42.355631, -71.060460', 'line': ['red', 'orange'], 'stop_id': 109 },  # downtown crossing            
            { 'll': '42.352396, -71.055310', 'line': ['red'], 'stop_id': 110 }, # south station     
            { 'll': '42.342785, -71.056898', 'line': ['red'], 'stop_id': 111 }, # broadway       
            { 'll': '42.330159, -71.057456', 'line': ['red'], 'stop_id': 112 }, # andrew       
            { 'll': '42.320895, -71.052177', 'line': ['red'], 'stop_id': 113 }, # jfk/umass       
            { 'll': '42.275376, -71.029561', 'line': ['red'], 'stop_id': 114 }, # quincy       
            { 'll': '42.266675, -71.020420', 'line': ['red'], 'stop_id': 115 }, # wollasten       
            { 'll': '42.251905, -71.005185', 'line': ['red'], 'stop_id': 116 }, # quincy center      
            { 'll': '42.233447, -71.007159', 'line': ['red'], 'stop_id': 117 }, # quincy adams     
            { 'll': '42.207895, -71.002095', 'line': ['red'], 'stop_id': 118 }, # braintree     
            { 'll': '42.311343, -71.053293', 'line': ['red'], 'stop_id': 119 }, # savin hill   
            { 'll': '42.300139, -71.061705', 'line': ['red'], 'stop_id': 120 }, # fields corner    
            { 'll': '42.293251, -71.065739', 'line': ['red'], 'stop_id': 121 }, # shawmut    
            { 'll': '42.284647, -71.064494', 'line': ['red'], 'stop_id': 122 }, # ashmont    
            { 'll': '42.279758, -71.060546', 'line': ['red'], 'stop_id': 123 }, # cedar grove    
            { 'll': '42.272423, -71.062692', 'line': ['red'], 'stop_id': 124 }, # butler    
            { 'll': '42.270359, -71.067670', 'line': ['red'], 'stop_id': 125 }, # milton    
            { 'll': '42.270073, -71.073378', 'line': ['red'], 'stop_id': 126 }, # central ave    
            { 'll': '42.268326, -71.081574', 'line': ['red'], 'stop_id': 127 }, # valley road    
            { 'll': '42.267691, -71.087668', 'line': ['red'], 'stop_id': 128 }, # cappen street    
            { 'll': '42.267818, -71.092132', 'line': ['red'], 'stop_id': 129 }, # mattapan    


            { 'll' : '42.436720, -71.071065' , 'line' : ['orange'] , 'stop_id' :130}, # Oak Grove Station
            { 'll' : '42.426417, -71.073811' , 'line' : ['orange'] , 'stop_id' :131}, # Malden Center Station
            { 'll' : '42.401894, -71.077159' , 'line' : ['orange'] , 'stop_id' :132}, # Wellington Station
            { 'll' : '42.392735, -71.077245' , 'line' : ['orange'] , 'stop_id' :133}, # Assembly Station
            { 'll' : '42.383955, -71.077159' , 'line' : ['orange'] , 'stop_id' :134}, # Sullivan Square Station
            { 'll' : '42.373588, -71.069777' , 'line' : ['orange'] , 'stop_id' :135}, # Community College Station
            { 'll' : '42.365598, -71.061666' , 'line' : ['orange', "green"] , 'stop_id' :136}, # North Station
            { 'll' : '42.362998, -71.058362' , 'line' : ['orange', "green"] , 'stop_id' :137}, # Haymarket Station
            { 'll' : '42.358939, -71.057804' , 'line' : ['orange', "blue"] , 'stop_id' :138}, # State Street Station
            { 'll' : '42.352501, -71.062610' , 'line' : ['orange'] , 'stop_id' :140}, # Chinatown Station
            { 'll' : '42.349615, -71.063941' , 'line' : ['orange'] , 'stop_id' :141}, # Tufts Medical Center Station
            { 'll' : '42.347332, -71.076043' , 'line' : ['orange'] , 'stop_id' :142}, # Back Bay Station
            { 'll' : '42.347902, -71.087973' , 'line' : ['orange'] , 'stop_id' :143}, # Massachusetts Avenue Station
            { 'll' : '42.347902, -71.087973' , 'line' : ['orange'] , 'stop_id' :144}, # Ruggles Station
            { 'll' : '42.331428, -71.095613' , 'line' : ['orange'] , 'stop_id' :145}, # Roxbury Crossing Station
            { 'll' : '42.323115, -71.099733' , 'line' : ['orange'] , 'stop_id' :146}, # Jackson Square Station
            { 'll' : '42.317213, -71.104754' , 'line' : ['orange'] , 'stop_id' :147}, # Stony Brook Station
            { 'll' : '42.310359, -71.107801' , 'line' : ['orange'] , 'stop_id' :148}, # Green Street Station
            { 'll' : '42.300647, -71.115869' , 'line' : ['orange'] , 'stop_id' :149}, # Forest Hills Station


            # { 'll' : 'Malden Center Station ,Malden, ma' , 'line' : 'orange' , 'stop_id' :131},
            # { 'll' : 'Wellington Station ,Medford, ma' , 'line' : 'orange' , 'stop_id' :132},
            # { 'll' : 'Assembly Station ,Somerville, ma' , 'line' : 'orange' , 'stop_id' :133},
            # { 'll' : 'Sullivan Square Station ,Charlestown, ma' , 'line' : 'orange' , 'stop_id' :134},
            # { 'll' : 'Community College Station ,Charlestown, ma' , 'line' : 'orange' , 'stop_id' :135},
            # { 'll' : 'North Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :136},
            # { 'll' : 'Haymarket Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :137},
            # { 'll' : 'State Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :138},
            # { 'll' : 'Downtown Crossing Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :139},
            # { 'll' : 'Chinatown Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :140},
            # { 'll' : 'Tufts Medical Center Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :141},
            # { 'll' : 'Back Bay Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :142},
            # { 'll' : 'Massachusetts Avenue Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :143},
            # { 'll' : 'Ruggles Station ,Boston, ma' , 'line' : 'orange' , 'stop_id' :144},
            # { 'll' : 'Roxbury Crossing Station ,Roxbury, ma' , 'line' : 'orange' , 'stop_id' :145},
            # { 'll' : 'Jackson Square Station ,Jamaica Plain, ma' , 'line' : 'orange' , 'stop_id' :146},
            # { 'll' : 'Stony Brook Station ,Jamaica Plain, ma' , 'line' : 'orange' , 'stop_id' :147},
            # { 'll' : 'Green Street Station ,Jamaica Plain, ma' , 'line' : 'orange' , 'stop_id' :148},
            # { 'll' : 'Forest Hills Station ,Jamaica Plain, ma' , 'line' : 'orange' , 'stop_id' :149},

            # { 'll' : 'Wonderland Station ,Revere, ma' , 'line' : 'blue' , 'stop_id' :150},
            # { 'll' : 'Revere Beach Station ,Revere, ma' , 'line' : 'blue' , 'stop_id' :151},
            # { 'll' : 'Beachmont Station ,Revere, ma' , 'line' : 'blue' , 'stop_id' :152},
            # { 'll' : 'Suffolk Downs Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :153},
            # { 'll' : 'Orient Heights Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :154},
            # { 'll' : 'Wood Island Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :155},
            # { 'll' : 'Airport Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :156},
            # { 'll' : 'Maverick Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :157},
            # { 'll' : 'Aquarium Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :158},
            # { 'll' : 'State Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :159},
            # { 'll' : 'Government Center Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :160},
            # { 'll' : 'Bowdoin Station ,Boston, ma' , 'line' : 'blue' , 'stop_id' :161},

            # { 'll' : 'Lechmere Station ,cambridge, ma' , 'line' : 'Green' , 'stop_id' :162},
            # { 'll' : 'Science Park Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :163},
            # { 'll' : 'North Station Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :164},
            # { 'll' : 'Haymarket Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :165},
            # { 'll' : 'Government Center Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :166},
            # { 'll' : 'Park Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :167},
            # { 'll' : 'Boylston Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :168},
            # { 'll' : 'Arlington Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :169},
            # { 'll' : 'Copley Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :170},
            # { 'll' : 'Hynes Convention Center Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :171},
            # { 'll' : 'Kenmore Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :172},
            # { 'll' : 'Blanford Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :173},
            # { 'll' : 'Boston University East Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :174},
            # { 'll' : 'Boston University Central Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :175},
            # { 'll' : 'Boston University West Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :176},
            # { 'll' : 'St. Paul Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :177},
            # { 'll' : 'Pleasant Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :178},
            # { 'll' : 'Babcock Street Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :179},
            # { 'll' : 'Packards Corner Station ,Allston, ma' , 'line' : 'Green' , 'stop_id' :180},
            # { 'll' : 'Harvard Avenue Station ,Allston, ma' , 'line' : 'Green' , 'stop_id' :181},
            # { 'll' : 'Griggs Street/ Long Avenue Station ,Allston, ma' , 'line' : 'Green' , 'stop_id' :182},
            # { 'll' : 'Allston Street Station ,Allston, ma' , 'line' : 'Green' , 'stop_id' :183},
            # { 'll' : 'Warren Street Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :184},
            # { 'll' : 'Washington Street Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :185},
            # { 'll' : 'Sutherland Road Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :186},
            # { 'll' : 'Chiswick Road Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :187},
            # { 'll' : 'Chestnut Hill Avenue Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :188},
            # { 'll' : 'South Street Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :189},
            # { 'll' : 'Boston College Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :190},
            # { 'll' : 'St. Marys Street Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :191},
            # { 'll' : 'Hawes Street Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :192},
            # { 'll' : 'Kent Street Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :193},
            # { 'll' : 'St. Paul Street Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :194},
            # { 'll' : 'Coolidge Corner Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :195},
            # { 'll' : 'Summit Avenue Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :196},
            # { 'll' : 'Brandon Hall Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :197},
            # { 'll' : 'Fairbanks Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :198},
            # { 'll' : 'Washington Square Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :199},
            # { 'll' : 'Tappan Street Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :200},
            # { 'll' : 'Dean Road Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :201},
            # { 'll' : 'Englewood Avenue Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :202},
            # { 'll' : 'Cleveland Circle Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :203},
            # { 'll' : 'Fenway Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :204},
            # { 'll' : 'Longwood Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :205},
            # { 'll' : 'Brookline Village Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :206},
            # { 'll' : 'Brookline Hills Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :207},
            # { 'll' : 'Beaconsfield Station ,Brookline, ma' , 'line' : 'Green' , 'stop_id' :208},
            # { 'll' : 'Resevoir Station ,Brighton, ma' , 'line' : 'Green' , 'stop_id' :209},
            # { 'll' : 'Chestnut Hill Avenue Station ,Chestnut Hill, ma' , 'line' : 'Green' , 'stop_id' :210},
            # { 'll' : 'Newton Centre Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :211},
            # { 'll' : 'Newton Highlands Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :212},
            # { 'll' : 'Eliot Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :213},
            # { 'll' : 'Waban Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :214},
            # { 'll' : 'Woodland Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :215},
            # { 'll' : 'Riverside Station ,Newton, ma' , 'line' : 'Green' , 'stop_id' :216},
            # { 'll' : 'Prudential Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :217},
            # { 'll' : 'Symphony Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :218},
            # { 'll' : 'Northeastern University Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :219},
            # { 'll' : 'Museum of Fine Arts Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :220},
            # { 'll' : 'Longwood Medical Area Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :221},
            # { 'll' : 'Brigham Circle Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :222},
            # { 'll' : 'Fenwood Road Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :223},
            # { 'll' : 'Mission Park Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :224},
            # { 'll' : 'Riverway Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :225},
            # { 'll' : 'Back of the Hill Station ,Boston, ma' , 'line' : 'Green' , 'stop_id' :226},
            # { 'll' : '315 Heath St Boston, MA 02130' , 'line' : 'Green' , 'stop_id' :227},              
        ]

def main():
    category  = 'Restaurants'
    for stop in stops:
        try:
            query_api(category, stop, 2000)
        except urllib2.HTTPError as error:
            sys.exit('Encountered HTTP error {0}. Abort program.'.format(error.code)) 


def query_api(category, stop, radius):
    global query_cnt
    url_params = {
        'term': 'restaurants',
        'location': stop['location'].replace(' ', '+'),
        'll' : stop['ll'].replace(' ', ''),
        'radius_filter' : radius,
        'sort': '0',
        'offset': '0',
        'limit': 20
    }

    response = request(API_HOST, SEARCH_PATH, url_params=url_params)
    query_cnt += 1
    runs  = int(math.ceil(int(response['total'])/float(20)))

    for i in range(runs):

        url_params['offset'] = i*20
        response = request(API_HOST, SEARCH_PATH, url_params=url_params)

        # pprint.pprint(response, indent=4)
        # print ""
        # print ""

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

            business = { 'name'         : item['name'], 
                         'rating'       : item['rating'], 
                         'review_count' : item['review_count'],
                         'url'          : item['url'],
                         'distance'     : item['distance'],
                         'categories'   : cat, 
                         #'latitude'     : latitude,
                         #'longitude'    : longitude,
                         'line'         : stop['line'],
                         'stop_id'      : stop['stop_id']
                       }

            data.append(business)

            # response = get_business(item['id'])
            # pprint.pprint(response, indent=2)
            # print ""

        query_cnt += 1
        print "radius: {0}, stop {1}".format(radius, stop)
        print "total queries: {0}".format(query_cnt)

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
    
    # print u'Querying {0} ...'.format(signed_url)

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
