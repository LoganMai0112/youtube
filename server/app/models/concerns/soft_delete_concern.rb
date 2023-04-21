module SoftDeleteConcern
  extend ActiveSupport::Concern

  included do
    scope :with_deleted, -> { all }
    scope :only_deleted, -> { where.not(deleted_at: nil) }
    scope :without_deleted, -> { where(deleted_at: nil) }
  end

  def destroy
    update(deleted_at: Time.zone.now)
  end

  def really_destroy!
    delete
  end

  def deleted?
    !deleted_at.nil?
  end

  def restore
    update(deleted_at: nil)
  end
end
