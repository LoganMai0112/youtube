class VideoPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope
      else
        scope.where(status: 'published')
      end
    end
  end

  def update?
    user.admin? or record.user == user
  end

  def destroy?
    user.admin? or record.user == user
  end

  def show?
    if record.only_me?
      user.admin? or record.user == user
    else
      record
    end
  end
end
