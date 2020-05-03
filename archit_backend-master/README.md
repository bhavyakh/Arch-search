# archit_backend
Backend of ArchSearh app with nodejs
Functioning at https://aqueous-cliffs-40873.herokuapp.com/

@route   GET api/customer/test
@desc    Tests users route
@access  Public
@route   GET api/customer/register
@desc    Register user
@access  Public
@route   POST api/customer/login
@desc    Login User / Returning JWT Token
@access  Public
@route   /api/customer/current
@desc    Return current user
@access  Private
@route   /api/customer/slot1
@desc    Return current user
@access  Private
@route   GET api/shopkeeper/register
@desc    Register user
@access  Public
@route   GET api/shopkeeper/login
@desc    Login User / Returning JWT Token
@access  Public
@route   POST api/shopkeeper/profile
@desc    Send unavailable
@access  Private
