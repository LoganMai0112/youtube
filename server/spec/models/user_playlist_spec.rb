require 'rails_helper'

RSpec.describe UserPlaylist, type: :model do
  describe 'enumeration' do
    it { is_expected.to define_enum_for(:action).with_values(%i[created saved]) }
  end

  describe 'association' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:playlist) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:action) }
  end
end
