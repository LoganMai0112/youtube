class UserPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.without_deleted
    end
  end

  def show?
    if record.deleted?
      user&.admin?
    else
      record
    end
  end

  def update?
    record == user
  end

  def edit?
    record == user
  end

  def destroy?
    user&.admin? || record == user
  end

  def recover?
    user&.admin?
  end
end
