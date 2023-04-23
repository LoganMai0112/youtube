require 'rails_helper'

RSpec.describe SubscribePolicy, type: :policy do
  subject { described_class.new(user, subscribe) }

  let(:user) { create(:user) }
  let(:user2) { create(:user) }
  let(:subscribe) { create(:subscribe, subscriber: user, subscribed_user: user) }

  it { is_expected.to forbid_actions(:create) }
  it { is_expected.to permit_actions(:destroy) }
end
