(function() {

    const map = document.getElementById('map');
    const infoWindow = document.getElementById('infowindow');  

    initMap.on('load', snap => {    
        map = new google.maps.Map(document.getElementById('map'), {     
            center: {
                lat: 47.82128,
                lng: -122.31559
            },
                 zoom: 6    
        });    
        infoWindow = new google.maps.InfoWindow;

             // Try HTML5 geolocation.
            
        if (navigator.geolocation) {     
            navigator.geolocation.getCurrentPosition(function(position) {      
                var pos = {       
                    lat: position.coords.latitude,
                           lng: position.coords.longitude      
                };

                      
                infoWindow.setPosition(pos);      
                infoWindow.setContent('Location found.');      
                infoWindow.open(map);      
                map.setCenter(pos);     
            }, function() {      
                handleLocationError(true, infoWindow, map.getCenter());     
            });    
        } else {      // Browser doesn't support Geolocation
                 
            handleLocationError(false, infoWindow, map.getCenter());    
        }   
    });

       
    //handleLocationError(browserHasGeolocation, infoWindow, pos) {    
    //    infoWindow.setPosition(pos);    
    //    infoWindow.setContent(browserHasGeolocation ?                'Error: The Geolocation service failed.' :                'Error: Your browser doesn\'t support geolocation.');    
    //    infoWindow.open(map);   
    //}
}());