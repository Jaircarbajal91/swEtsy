from flask.cli import AppGroup
from .users import seed_users, undo_users
from .products import seed_products, undo_products
from .cart import seed_carts,undo_carts
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_products()
    seed_carts()
    seed_reviews()

    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_products()
    undo_carts()
    undo_reviews()
    # Add other undo functions here
