require 'rails_helper'

RSpec.describe UserPlaylistPolicy, type: :policy do
  subject { described_class.new(user, user_playlist) }

  let(:user) { create(:user) }
  let(:playlist) { create(:playlist) }
  let(:user_playlist) { create(:user_playlist, user: user, playlist: playlist) }

  it { is_expected.to permit_actions(%i[create destroy]) }
end
