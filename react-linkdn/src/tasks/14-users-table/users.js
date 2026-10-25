const NAMES = [
  'Thulasi', 'Sambath', 'Guna', 'Punitha', 'Keerthi', 'Rajesh', 'Kalaivendhan', 'Vishnu', 'Swathy',
  'Senthil', 'Priya', 'Murugan', 'Lakshmi', 'Saravanan', 'Revathi', 'Dinesh', 'Kavya', 'Prakash', 'Kaviraj',
];
const INITIALS = ['R', 'S', 'K', 'M', 'P', 'V'];
const ROLES = ['Admin', 'Manager', 'Sales', 'Support'];
const CITIES = ['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem', 'Bengaluru'];

export const USERS = Array.from({ length: 57 }, (_, i) => {
  const first = NAMES[i % NAMES.length];
  const initial = INITIALS[i % INITIALS.length];
  return {
    id: i + 1,
    name: first + ' ' + initial,
    email: first.toLowerCase() + '.' + initial.toLowerCase() + (i + 1) + '@example.com',
    role: ROLES[i % ROLES.length],
    city: CITIES[i % CITIES.length],
  };
});

export function filterUsers(q, sort, dir) {
  const text = q.toLowerCase();
  const list = USERS.filter(u => (u.name + ' ' + u.email + ' ' + u.city).toLowerCase().includes(text));
  return list.sort((a, b) => {
    const result = a[sort].localeCompare(b[sort]);
    return dir === 'asc' ? result : -result;
  });
}
