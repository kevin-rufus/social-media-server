import { hashSync } from 'bcrypt';
import { sequelize } from '../src/services/db.js';
import User from '../src/models/user.js';

(async () => {
  console.log('Creating tables...');
  await sequelize.sync({force: true});

  console.log('Generating data...');
  const _users = [
    ['admin@gmail.com', 'admin', 'admin'],
    ['test@gmail.com', 'test', 'user'],
    ['user@gmail.com', 'password', 'user'],
  ]
  try {
    await User.bulkCreate(
      _users
        .map(u => ({
          email: u[0],
          password: hashSync(u[1], 12),
          role: u[2],
        }))
    )
    console.log('DB seeded. Default users:\n', _users)
  } catch (e) {
    console.error('Failed to create seed users.\n', e)
    process.exit(1)
  }
})();
