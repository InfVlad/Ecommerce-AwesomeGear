import bcrypt from "bcryptjs";

const data = {
    users: [
        {
            name: 'John',
            email: 'admin1@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
          },
          {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
          },
    ]
}

export default data;