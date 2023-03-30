class VideoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.without_deleted.where(status: 'published')
    end
  end

  def create?
    user
  end

  def update?
    record.user == user or !record.deleted?
  end

  def destroy?
    user.admin? or record.user == user
  end

  def recover?
    user.admin?
  end

  def show?
    if record.deleted?
      user.admin?
    elsif record.privated?
      user.admin? or record.user == user
    else
      record
    end
  end
end
