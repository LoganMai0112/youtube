require 'rails_helper'

RSpec.describe Report, type: :model do
  describe 'association' do
    it { is_expected.to belong_to(:reportable)}
  end
end
