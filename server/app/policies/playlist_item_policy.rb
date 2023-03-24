class PlaylistItemPolicy < ApplicationPolicy
  class Scope < Scope
    # NOTE: Be explicit about which records you allow access to!
    def resolve
      scope.all
    end
  end

  def create?
    # UserPlaylist.find(..).created? is to check if current_user is the person who create this playlist to add video
    user.admin? or (user && UserPlaylist.find_by(user: user, playlist: record.playlist).created? && record.video.published?)
  end

  def destroy?
    user.admin? or (user && UserPlaylist.find_by(user: user, playlist: record.playlist).created? && record.video.published?)
  end
end
