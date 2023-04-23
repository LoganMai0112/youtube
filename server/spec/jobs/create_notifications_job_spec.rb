require 'rails_helper'

RSpec.describe NotificationsBroadcastJob, type: :job do
  it 'queue the job' do
    ActiveJob::Base.queue_adapter = :test
    expect do
      CreateNotificationsJob.perform_later
    end.to have_enqueued_job(CreateNotificationsJob)
  end
end
