import React from 'react';
import GoogleMapsLoader from 'google-maps';

class LatLongMap extends React.Component {

  constructor(props) {
    super(props);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.state = {
      map: null
    };
  }

  displayName() {
    return 'LatLongMap';
  }

  componentDidMount() {
    GoogleMapsLoader.load(function (google) {
      const mapOptions = {
        minZoom: 10,
        zoom: 12,
        center: new google.maps.LatLng(21.3114, -157.7964)
      };

      const map = new google.maps.Map(this.refs.map_canvas.getDOMNode(),
                                      mapOptions);
      this.setState({map: map});
    }.bind(this)).bind(this);
  }

  handleMapClick(e) {
    console.log('CLICK');
  }

  render() {
    return (
      <div className='form-group'>
        <div id='map_canvas' ref='map_canvas'></div>
      </div>
    );
  }
}

export default LatLongMap;
