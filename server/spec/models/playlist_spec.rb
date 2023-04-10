require 'rails_helper'

RSpec.describe Playlist, type: :model do
  describe 'enumerations' do
    it { is_expected.to define_enum_for(:status).with_values(%i[published privated])}
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title)}
    it { is_expected.to validate_presence_of(:status)}
  end

  describe 'associations' do
    it { is_expected.to have_many(:playlist_items).dependent(:destroy)}
    it { is_expected.to have_many(:videos)}
    it { is_expected.to have_many(:user_playlists).dependent(:destroy)}
    it { is_expected.to have_many(:users)}
  end
end
