// controllers/userController.js

exports.createUser = (req, res) => {
  const user = req.body;

  // Simulate saving user (you can add DB logic here)
  res.status(200).json({
    message: 'User created successfully',
    data: user,
  });

  console.log('User created:', user);
};
