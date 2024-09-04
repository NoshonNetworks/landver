import React from 'react';
import { useParams } from 'react-router-dom';

function LandDetails() {
  const { id } = useParams();
  return <div>Land Details Component for ID: {id}</div>;
}

export default LandDetails;