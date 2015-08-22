import React from 'react';
import GoogleMapsLoader from 'google-maps';

class LatLngMap extends React.Component {

  constructor(props) {
    super(props);
    this.placeMarker = this.placeMarker.bind(this);
    this.state = {
      map: null,
      marker: null,
      lat: this.props.lat,
      lng: this.props.lng
    };
  }

  displayName() {
    return 'LatLngMap';
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentDidMount() {
    const component = this;
    GoogleMapsLoader.load(function (google) {
      const mapOptions = {
        minZoom: 12,
        zoom: 14,
        center: new google.maps.LatLng(21.3114, -157.7964)
      };

      const map = new google.maps.Map(component.refs.map_canvas.getDOMNode(),
                                      mapOptions);

      google.maps.event.addListener(map, 'click', function (event) {
        component.placeMarker(google, map, event.latLng);
      });

      component.setState({map: map});
    });
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

LatLngMap.propTypes = {
  lat: React.PropTypes.float,
  lng: React.PropTypes.float,
  onLocationSelected: React.PropTypes.function
};

export default LatLngMap;
