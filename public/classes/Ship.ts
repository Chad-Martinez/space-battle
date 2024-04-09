class Ship {
  hull: number;
  firepower: number;
  accuracy: number;

  id: string = 'ship';
  characters: Array<Character> = [
    {
      name: 'Planet Express',
      class: 'planet-express',
      image: 'planet-express.webp',
    },
    {
      name: 'Nimbus',
      class: 'nimbus',
      image: 'nimbus.webp',
    },
  ];

  constructor(hull: number, firepower: number, accuracy: number) {
    this.hull = hull;
    this.firepower = firepower;
    this.accuracy = accuracy;
  }
}
