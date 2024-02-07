export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');

// Function to get a random avatar from the list
export const getRandomAvatar = () => {
  const avatarsFolder = '/assets/avatars'; // Path to the avatars folder within the public folder
  const avatarNames = ['avatar-alcides-antonio.png', 'avatar-anika-visser.png', 'avatar-cao-yu.png', 'avatar-carson-darrin.png', 'avatar-chinasa-neo.png', 'avatar-fran-perez.png', 'avatar-iulia-albu.png', 'avatar-jane-rotanson.png', 'avatar-jie-yan-song.png', 'avatar-marcus-finn.png', 'avatar-miron-vitold.png', 'avatar-nasimiyu-danai.png', 'avatar-neha-punita.png', 'avatar-omar-darboe.png', 'avatar-penjani-inyene.png', 'avatar-seo-hyeon-ji.png', 'avatar-siegbert-gottfried.png']; // List of avatar filenames
  const randomIndex = Math.floor(Math.random() * avatarNames.length);
  return `${avatarsFolder}/${avatarNames[randomIndex]}`;
};