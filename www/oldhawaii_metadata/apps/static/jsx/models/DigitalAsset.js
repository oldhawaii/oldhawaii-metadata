'use strict';

class DigitalAsset {
  constructor(type = 'image',
              source_organization = null,
              title = '',
              description = '',
              author = '',
              published_date = null,
              image_url = null,
              image_width = null,
              image_height = null,
              thumbnail_url = null,
              thumbnail_width = null,
              thumbnail_height = null,
              audio_url = null,
              audio_length = null,
              latitude = 0,
              longitude = 0) {
    this.type = type;
    this.source_organization = source_organization;
    this.title = title;
    this.description = description;
    this.author = author;
    this.published_date = published_date;
    this.image_url = image_url;
    this.image_width = image_width;
    this.image_height = image_height;
    this.thumbnail_url = thumbnail_url;
    this.thumbnail_width = thumbnail_width;
    this.thumbnail_height = thumbnail_height;
    this.audio_url = audio_url;
    this.audio_length = audio_length;
    this.latitude = latitude;
    this.longitude = longitude;
  }
};

export default DigitalAsset;
