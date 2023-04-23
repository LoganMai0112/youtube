require 'rails_helper'

RSpec.describe PlaylistItem, type: :model do
  describe 'association' do
    it { is_expected.to belong_to(:playlist)}
    it { is_expected.to belong_to(:video)}
  end
end
