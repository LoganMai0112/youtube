class VideoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user&.admin?
        scope.where.not(status: 'deleted')
      else
        scope.where(status: 'published')
      end
    end
  end

  def create?
    user
  end

  def update?
    if record.deleted?
      user&.admin?
    else
      user.admin? or record.user == user
    end
  end

  def destroy?
    if record.deleted?
      user&.admin?
    else
      user.admin? or record.user == user
    end
  end

  def show?
    if record.privated?
      user.admin? or record.user == user
    elsif record.deleted?
      user&.admin?
    else
      record
    end
  end
end
