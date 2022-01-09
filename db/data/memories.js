function randomCoordinate () {
  return ((Math.random() * 360) - 180 )
}

export default [{
  name: 'Findind a cool horse',
  location: 'desert',
  image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/B875/production/_102512274_gettyimages-518360318.jpg',
  notes: 'met horse, was cool horse',
  lat: 40.019288,
  long: -12.09866,
},
{
  name: 'Met the president of Uzbekistan',
  location: 'Tashkent',
  image: 'url go here',
  notes: 'met president, seemed nice',
  lat: 57.55468464,
  long: 12.654684836,
},
{
  name: 'Met the presidtwo of Uzbekistan',
  location: 'Tashkent',
  image: 'new image url',
  notes: 'met president, seemed nice',
  lat: randomCoordinate(),
  long: randomCoordinate(),
},
{
  name: 'Met the presidone of Uzbekistan',
  location: 'Tashkent',
  image: 'another new image url',
  notes: 'met president, seemed nice',
  lat: randomCoordinate(),
  long: randomCoordinate(),
}
]