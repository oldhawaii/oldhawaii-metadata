'use strict';

import React from 'react';
import MetadataForm from './components/MetadataForm';

document.addEventListener('DOMContentLoaded', function () {
  React.render(
    <MetadataForm />,
    document.getElementById('main')
  )
});
