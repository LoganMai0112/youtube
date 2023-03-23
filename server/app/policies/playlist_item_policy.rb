class PlaylistItemPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    #UserPlaylist.find(..).created? is to check if current_user is a person who create this playlist to add video 
    user.admin? or (user && UserPlaylist.find(user: user, playlist: record.playlist).created? && record.video.published?)
  end

  def destroy?
    # user.admin? or (user && )
  end
end
