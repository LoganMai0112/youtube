require 'rails_helper'

RSpec.describe NotificationsBroadcastJob, type: :job do

  it 'queue the job' do
    ActiveJob::Base.queue_adapter = :test
    expect { 
      NotificationsBroadcastJob.perform_later
    }.to have_enqueued_job(NotificationsBroadcastJob)
  end
end
