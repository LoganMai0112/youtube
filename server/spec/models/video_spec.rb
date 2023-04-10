require 'rails_helper'

RSpec.describe Video, type: :model do
  describe 'enumeration' do
    it { is_expected.to define_enum_for(:status).with_values(%i[privated published]) }
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:source) }
    it { is_expected.to validate_presence_of(:title) }
  end

  describe 'associations' do
    it { is_expected.to have_one_attached(:source) }
    it { is_expected.to have_one_attached(:thumbnail) }

    it { is_expected.to have_many(:likes).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }
    it { is_expected.to have_many(:playlist_item).dependent(:destroy) }
    it { is_expected.to have_many(:reports).dependent(:destroy) }
    it { is_expected.to have_many(:views).dependent(:destroy) }
    it { is_expected.to have_many(:notifications).dependent(:destroy) }

    it { is_expected.to belong_to(:user) }
  end
end
