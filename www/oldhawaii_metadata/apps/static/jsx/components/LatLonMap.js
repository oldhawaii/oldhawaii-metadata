import React from 'react';
import GoogleMapsLoader from 'google-maps';

class LatLonMap extends React.Component {

  constructor(props) {
    super(props);
    this.placeMarker = this.placeMarker.bind(this);
    this.state = {
      map: null,
      marker: null,
      lat: this.props.lat,
      lon: this.props.lon
    };
  }

  displayName() {
    return 'LatLongMap';
  }

  componentDidMount() {
    GoogleMapsLoader.load(function (google) {
      const mapOptions = {
        minZoom: 12,
        zoom: 14,
        center: new google.maps.LatLng(21.3114, -157.7964)
      };

      const map = new google.maps.Map(this.refs.map_canvas.getDOMNode(),
                                      mapOptions);

      google.maps.event.addListener(map, 'click', function (event) {
        this.placeMarker(google, map, event.latLng);
      }.bind(this)).bind(this);

      this.setState({map: map});

    }.bind(this)).bind(this);
  }

  placeMarker(google, map, position) {
    const lat = position.lat();
    const lng = position.lng();
    if (this.state.marker != null) {
      this.state.marker.setPosition(position);
    } else {
      const marker = new google.maps.Marker({
        position: position,
        map: map
      });
      this.setState({marker: marker});
    }
    this.setState({lat: lat, lng: lng});
    this.props.onLocationSelected(lat, lng);
    map.panTo(position);
  }

  getLatitude() {
    return this.state.lat;
  }

  getLongitude() {
    return this.state.lng;
  }

  render() {
    return (
      <div className='form-group'>
        <div id='map_canvas' ref='map_canvas'></div>
      </div>
    );
  }
}

LatLonMap.propTypes = {
  lat: React.PropTypes.float,
  lon: React.PropTypes.float,
  onLocationSelected: React.PropTypes.function
};

export default LatLonMap;
