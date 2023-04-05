class ViewsController < ApplicationController
  def create
    view = View.new(video_id: params[:video_id], user_id: current_user.id)
    if view.save
      render json: view, status: :ok
    else
      render json: { message: "Can't increase view" }, status: :internal_server_error
    end
  end
end
