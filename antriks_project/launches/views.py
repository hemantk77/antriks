import requests
from django.shortcuts import render
from django.core.cache import cache

# Base URL for The SpaceDevs API
API_URL = "https://ll.thespacedevs.com/2.3.0/launches/upcoming/"

def index(request):
    """
    View for the main page.
    Fetches the next 3 upcoming launches.
    """
    cache_key = "home_launches"
    launches = cache.get(cache_key)
    
    if not launches:
        try:
            # Call the API for the main page
            response = requests.get(API_URL, params={"limit": 3})
            response.raise_for_status() # Raise an error for bad responses
            data = response.json()
            launches = data.get("results", [])
            
            #Save the result to the cache for next time
            # It will use the default 300-second timeout
            cache.set(cache_key, launches)
            
        except requests.RequestException as e:
            print(f"Error fetching API: {e}")
            launches = [] # Send empty list on error

    context = {
        'launches': launches
    }
    return render(request, 'launches/index.html', context)

def agency_launches(request, agency_name):
    """
    View for a specific agency's launch page.
    Fetches launches filtered by the agency name.
    """
    cache_key = f"launches_{agency_name}"
    launches = cache.get(cache_key)
    
    if not launches:
        try:
            # Call the API with a search filter
            response = requests.get(API_URL, params={"limit": 10, "search": agency_name})
            response.raise_for_status()
            data = response.json()
            launches = data.get("results", [])
            
            #Save the result to the cache for next time
            # It will use the default 300-second timeout
            cache.set(cache_key, launches)
            
        except requests.RequestException as e:
            print(f"Error fetching API: {e}")
            launches = []

    context = {
        'launches': launches,
        'agency_name': agency_name.upper() # To display "NASA" or "ISRO" on the page
    }
    # We can reuse the same template for this!
    # Or you can use 'launches/launches.html'
    return render(request, 'launches/launches.html', context)