require 'rails_helper'

RSpec.describe Stream, type: :model do
  describe 'association' do
    it { is_expected.to have_one_attached(:source) }
    it { is_expected.to have_one_attached(:thumbnail) }
    it { is_expected.to have_many(:notifications) }
    it { is_expected.to belong_to(:user) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:title) }
  end
end
