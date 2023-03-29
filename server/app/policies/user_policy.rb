class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def show?
    if record.role == 'deleted'
      user&.admin?
    else
      record
    end
  end

  def update?
    user&.admin? || record == user
  end

  def edit?
    record == user
  end

  def destroy?
    user&.admin? || record == user
  end
end
