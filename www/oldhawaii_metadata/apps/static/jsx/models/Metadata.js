'use strict';

class Metadata {
  constructor(type = 'image', title = '',
              description = '', author = '', latitude = 0, longitude = 0) {
    this.type = type;
    this.title = title;
    this.description = description;
    this.author = author;
    this.latitude = latitude;
    this.longitude = longitude;
  }
};

export default Metadata;
