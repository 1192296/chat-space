class GroupUser < ApplicationRecord
  belong_to :Group
  belong_to :user
end
