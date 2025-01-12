"""empty message

Revision ID: 53f33d1882ab
Revises: 018ef7d716a9
Create Date: 2025-01-12 16:38:37.730408

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '53f33d1882ab'
down_revision = '018ef7d716a9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(length=150), nullable=False))

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('profile_image', sa.String(length=150), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('profile_image')

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
