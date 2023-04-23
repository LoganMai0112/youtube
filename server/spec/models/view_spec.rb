require 'rails_helper'

RSpec.describe View, type: :model do
  describe 'association' do
    it { is_expected.to belong_to(:video)}
  end
end
