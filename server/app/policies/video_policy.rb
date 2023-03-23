class VideoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user && user.admin?
        scope
      else
        scope.where(status: 'published')
      end
    end
  end

  def create?
    user
  end

  def update?
    user.admin? or record.user == user
  end

  def destroy?
    user.admin? or record.user == user
  end

  def show?
    if record.privated?
      user.admin? or record.user == user
    else
      record
    end
  end
end
