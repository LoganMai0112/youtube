require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'association' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:video) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:content) }
  end
end
