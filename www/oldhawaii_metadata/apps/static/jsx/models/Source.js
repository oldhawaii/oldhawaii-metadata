'use strict';

class Source {
  constructor(name = '',
              url = '',
              email = '',
              phone_number = '') {
    this.name = name;
    this.url = url;
    this.email = email;
    this.phone_number = phone_number;
  }
};

export default Source;
