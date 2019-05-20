class GroupUser < ApplicationRecord
  belongs_to :Group
  belongs_to :user
end
